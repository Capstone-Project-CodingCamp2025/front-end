import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPlaceById } from '../api/place';
import { getPopularRecommendations } from '../api/recommendations';
import { submitRating as apiSubmitRating, getRatingsForPlace } from '../api/ratings';
import { useAuth } from '../context/AuthContext'; 
import Swal from 'sweetalert2';
import { 
  addBookmark as apiAddBookmark, 
  removeBookmark as apiRemoveBookmark, 
  checkBookmarkStatus 
} from '../api/bookmark';

export function useDestinationDetailPresenter() {
  const { id } = useParams();
  const placeId = id; 
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, token } = useAuth(); // Tambahkan token dari auth context

  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', review: '', rating: 0 });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const contentRef = useRef(null); 
  const [imageHeight, setImageHeight] = useState('auto'); 

  // Enhanced token validation
  const validateToken = useCallback(() => {
    const localStorageToken = localStorage.getItem('authToken');
    const contextToken = token;
    
    console.log('=== TOKEN VALIDATION ===');
    console.log('LocalStorage token:', localStorageToken ? `${localStorageToken.substring(0, 20)}...` : 'null');
    console.log('Context token:', contextToken ? `${contextToken.substring(0, 20)}...` : 'null');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('User:', user ? user.username || user.name : 'null');
    
    // Jika ada token di context tapi tidak di localStorage, sync
    if (contextToken && !localStorageToken) {
      console.log('🔄 Syncing token from context to localStorage');
      localStorage.setItem('authToken', contextToken);
      return contextToken;
    }
    
    // Jika ada token di localStorage tapi tidak di context, gunakan localStorage
    if (localStorageToken && !contextToken) {
      console.log('🔄 Using localStorage token as fallback');
      return localStorageToken;
    }
    
    return localStorageToken || contextToken;
  }, [token, isAuthenticated, user]);

  // Helper function untuk sync dengan localStorage (optional, untuk backward compatibility)
  const syncBookmarkWithLocalStorage = useCallback(() => {
    if (!destination) return;
    
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    
    if (isBookmarked) {
      // Tambah ke localStorage jika belum ada
      const alreadyExists = bookmarks.some(item => String(item.id) === String(destination.id));
      if (!alreadyExists) {
        bookmarks.push({
          id: destination.id,
          name: destination.name || destination.nama_tempat,
          image: destination.image || destination.gambar,
          rating: destination.rating,
          location: destination.location || destination.alamat,
          price: destination.price
        });
      }
    } else {
      // Hapus dari localStorage
      bookmarks = bookmarks.filter((item) => String(item.id) !== String(destination.id));
    }
    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [destination, isBookmarked]);

  const fetchDetailsAndReviews = useCallback(async () => {
    console.log('=== FETCHING DESTINATION DETAILS ===');
    console.log('Place ID:', placeId);
    
    // Force token validation before fetch
    const validToken = validateToken();
    console.log('Valid token for fetch:', validToken ? 'YES' : 'NO');
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Validasi place ID
      if (!placeId || isNaN(placeId)) {
        throw new Error('ID tempat tidak valid');
      }

      let destinationData = null;
      let reviewsData = [];

      // STRATEGI 1: Coba ambil dari database dulu
      try {
        console.log('🔍 Trying getPlaceById...');
        destinationData = await getPlaceById(placeId);
        console.log('✅ getPlaceById success:', destinationData?.name);
      } catch (dbError) {
        console.log('❌ getPlaceById failed:', dbError.message);
        
        // STRATEGI 2: Fallback ke popular recommendations
        console.log('🔄 Fallback to popular recommendations...');
        const popularData = await getPopularRecommendations();
        const allDestinations = Array.isArray(popularData) ? popularData : popularData.destinations || [];
        
        console.log('📊 Popular data loaded:', allDestinations.length, 'destinations');
        
        // Cari destination dengan ID yang cocok
        destinationData = allDestinations.find(dest => String(dest.id) === String(placeId));
        
        if (!destinationData) {
          console.log('📋 Available IDs in popular data:');
          allDestinations.slice(0, 10).forEach(dest => {
            console.log(`  - ID: ${dest.id} (${typeof dest.id}) - ${dest.name || dest.nama_tempat}`);
          });
          
          throw new Error(`Tempat dengan ID ${placeId} tidak ditemukan di data populer. Available IDs: ${allDestinations.map(d => d.id).slice(0, 10).join(', ')}`);
        }
        
        console.log('✅ Found in popular data:', destinationData.name || destinationData.nama_tempat);
        
        // Normalisasi data struktur jika diperlukan
        if (!destinationData.name && destinationData.nama_tempat) {
          destinationData.name = destinationData.nama_tempat;
        }
        if (!destinationData.image && destinationData.gambar) {
          destinationData.image = destinationData.gambar;
        }
        if (!destinationData.location && destinationData.alamat) {
          destinationData.location = destinationData.alamat;
        }
      }

      // Ambil reviews (selalu coba ambil)
      try {
        reviewsData = await getRatingsForPlace(placeId);
        console.log('✅ Reviews data received:', reviewsData?.length || 0, 'reviews');
      } catch (reviewError) {
        console.log('⚠️ Reviews not available:', reviewError.message);
        reviewsData = []; // Set empty array if reviews fail
      }
      
      setDestination(destinationData);
      
      // Pastikan reviewsData adalah array
      const reviewsArray = Array.isArray(reviewsData) ? reviewsData : [];
      setReviews(reviewsArray);

      // UPDATED: Cek bookmark status dari database jika user login
      if (isAuthenticated && destinationData && validToken) {
        try {
          console.log('🔍 Checking bookmark status with valid token...');
          const bookmarkStatusResponse = await checkBookmarkStatus(destinationData.id);
          setIsBookmarked(bookmarkStatusResponse.data?.is_bookmarked || false);
          console.log('✅ Bookmark status loaded from database:', bookmarkStatusResponse.data?.is_bookmarked);
        } catch (bookmarkError) {
          console.log('⚠️ Failed to load bookmark status from database:', bookmarkError);
          console.log('🔄 Falling back to localStorage');
          // Fallback ke localStorage
          const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
          setIsBookmarked(savedBookmarks.some((item) => String(item.id) === String(destinationData.id)));
        }
      } else if (!isAuthenticated) {
        // Jika tidak login, gunakan localStorage
        console.log('📱 Using localStorage for bookmark status (not authenticated)');
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setIsBookmarked(savedBookmarks.some((item) => String(item.id) === String(destinationData.id)));
      } else {
        console.log('⚠️ No valid token or authentication for bookmark check');
      }

      // Inisialisasi nama di form review jika user sudah login
      if (isAuthenticated && user) {
        setReviewForm(prev => ({ ...prev, name: user.name || user.username || '' }));
      }

    } catch (err) {
      console.error("❌ Presenter: Error fetching destination details or reviews:", err);
      
      // Handle specific error cases
      if (err.message?.includes('tidak ditemukan')) {
        setError(`Tempat dengan ID ${placeId} tidak ditemukan. ${err.message}`);
        
        // Show suggestion dialog
        Swal.fire({
          title: 'Tempat Tidak Ditemukan',
          text: err.message,
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Kembali ke Beranda',
          cancelButtonText: 'Tetap di Halaman'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else if (err.code === 'ERR_NETWORK') {
        setError("Tidak dapat terhubung ke server. Pastikan server backend berjalan.");
      } else {
        setError("Gagal memuat detail destinasi atau ulasan.");
      }
      
      // Set reviews ke array kosong jika error
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [placeId, isAuthenticated, user, navigate, validateToken]);

  useEffect(() => {
    fetchDetailsAndReviews();
  }, [fetchDetailsAndReviews]);

  useEffect(() => {
    if (destination && contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const calculatedHeight = Math.max(300, Math.min(contentHeight, 500));
      setImageHeight(`${calculatedHeight}px`);
    }
  }, [destination, contentRef]); 

  // UPDATED: Handle bookmark dengan enhanced token validation
  const handleBookmark = async () => {
    if (!destination) return;

    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Diperlukan',
        text: 'Anda harus login untuk menambahkan atau menghapus bookmark. Ingin login sekarang?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Login!',
        cancelButtonText: 'Nanti Saja'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: `/destination/${placeId}` } });
        }
      });
      return; 
    }

    // Validate token before bookmark operation
    const validToken = validateToken();
    if (!validToken) {
      console.error('❌ No valid token for bookmark operation');
      Swal.fire({
        title: 'Session Berakhir',
        text: 'Sesi login Anda telah berakhir. Silakan login kembali.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Kembali'
      }).then(() => {
        navigate('/login', { state: { from: `/destination/${placeId}` } });
      });
      return;
    }

    try {
      console.log('=== BOOKMARK OPERATION ===');
      console.log('Current bookmark status:', isBookmarked);
      console.log('Valid token available:', !!validToken);
      
      if (isBookmarked) {
        // Remove bookmark dari database
        console.log('🗑️ Removing bookmark...');
        await apiRemoveBookmark(destination.id);
        setIsBookmarked(false);
        
        Swal.fire('Dihapus', 'Destinasi dihapus dari bookmark.', 'info');
      } else {
        // Add bookmark ke database
        console.log('➕ Adding bookmark...');
        await apiAddBookmark(destination.id);
        setIsBookmarked(true);
        
        Swal.fire('Ditambahkan!', 'Destinasi berhasil ditambahkan ke bookmark!', 'success');
      }
      
      // Sync dengan localStorage untuk backward compatibility
      syncBookmarkWithLocalStorage();
      
    } catch (error) {
      console.error('❌ Bookmark operation failed:', error);
      
      if (error.statusCode === 409) {
        // Bookmark sudah ada
        setIsBookmarked(true);
        syncBookmarkWithLocalStorage();
        Swal.fire('Info', 'Destinasi sudah ada di bookmark Anda.', 'info');
      } else if (error.statusCode === 404) {
        // Bookmark tidak ditemukan saat hapus
        setIsBookmarked(false);
        syncBookmarkWithLocalStorage();
        Swal.fire('Info', 'Bookmark tidak ditemukan.', 'info');
      } else if (error.statusCode === 401) {
        // Unauthorized - token expired or invalid
        console.error('❌ Token expired or invalid during bookmark operation');
        Swal.fire({
          title: 'Session Berakhir',
          text: 'Sesi login Anda telah berakhir. Silakan login kembali.',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Login Kembali'
        }).then(() => {
          // Clear expired token
          localStorage.removeItem('authToken');
          navigate('/login', { state: { from: `/destination/${placeId}` } });
        });
      } else {
        Swal.fire('Error', error.message || 'Gagal memproses bookmark.', 'error');
      }
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReviewForm(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.review.trim() || reviewForm.rating <= 0) {
      Swal.fire('Oops...', 'Mohon lengkapi nama, ulasan, dan berikan rating!', 'error');
      return;
    }

    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Diperlukan',
        text: 'Anda harus login untuk memberikan ulasan. Ingin login sekarang?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Login!',
        cancelButtonText: 'Nanti Saja'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: `/destination/${placeId}` } });
        }
      });
      return;
    }

    // Validate token before review submission
    const validToken = validateToken();
    if (!validToken) {
      console.error('❌ No valid token for review submission');
      Swal.fire({
        title: 'Session Berakhir',
        text: 'Sesi login Anda telah berakhir. Silakan login kembali.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Kembali'
      }).then(() => {
        navigate('/login', { state: { from: `/destination/${placeId}` } });
      });
      return;
    }

    setIsSubmittingReview(true);
    try {
      const newReviewData = {
        rating: reviewForm.rating,
        review: reviewForm.review,
        userName: reviewForm.name 
      };
      
      console.log('📝 Submitting review:', newReviewData);
      const submittedReview = await apiSubmitRating(placeId, newReviewData.rating, newReviewData.review, newReviewData.userName);
      console.log('✅ Review submitted successfully:', submittedReview);
      
      // Pastikan prevReviews adalah array sebelum spread
      setReviews(prevReviews => {
        const currentReviews = Array.isArray(prevReviews) ? prevReviews : [];
        return [...currentReviews, submittedReview];
      });
      
      Swal.fire('Sukses!', 'Ulasan berhasil dikirim!', 'success');
      setReviewForm({ name: isAuthenticated && user ? (user.name || user.username || '') : '', review: '', rating: 0 });
      
      // Refresh reviews setelah submit
      setTimeout(() => {
        fetchDetailsAndReviews();
      }, 1000);
      
    } catch (err) {
      console.error('❌ Presenter: Failed to submit review:', err);
      if (err.statusCode === 401) {
        Swal.fire({
          title: 'Session Berakhir',
          text: 'Sesi login Anda telah berakhir. Silakan login kembali.',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Login Kembali'
        }).then(() => {
          localStorage.removeItem('authToken');
          navigate('/login', { state: { from: `/destination/${placeId}` } });
        });
      } else {
        Swal.fire('Gagal!', err.message || 'Gagal mengirim ulasan.', 'error');
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return {
    destination,
    isLoading,
    error,
    isBookmarked,
    reviews,
    reviewForm,
    isSubmittingReview,
    contentRef, 
    imageHeight,  
    handleBookmark,
    handleReviewInputChange,
    handleRatingChange,
    handleSubmitReview,
    navigateBack: () => navigate(-1),
  };
}