import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPlaceById } from '../api/place';
import { submitRating as apiSubmitRating, getRatingsForPlace } from '../api/ratings';
import { useAuth } from '../context/AuthContext'; 
import Swal from 'sweetalert2';

export function useDestinationDetailPresenter() {
  const { id: placeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth(); 

  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', review: '', rating: 0 });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const contentRef = useRef(null); 
  const [imageHeight, setImageHeight] = useState('auto'); 

  const fetchDetailsAndReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [destinationData, reviewsData] = await Promise.all([
        getPlaceById(placeId),
        getRatingsForPlace(placeId)
      ]);
      setDestination(destinationData);
      setReviews(reviewsData || []);

      // Cek bookmark
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setIsBookmarked(savedBookmarks.some((item) => String(item.id) === String(destinationData.id)));

      // Inisialisasi nama di form review jika user sudah login
      if (isAuthenticated && user) {
        setReviewForm(prev => ({ ...prev, name: user.name || user.username || '' }));
      }

    } catch (err) {
      console.error("Presenter: Error fetching destination details or reviews:", err);
      setError("Gagal memuat detail destinasi atau ulasan.");
    } finally {
      setIsLoading(false);
    }
  }, [placeId, isAuthenticated, user]);

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

  const handleBookmark = () => {
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

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const alreadyBookmarked = bookmarks.some(item => String(item.id) === String(destination.id));

    if (!alreadyBookmarked) {
      bookmarks.push({
        id: destination.id,
        name: destination.name,
        image: destination.image,
        rating: destination.rating,
        location: destination.location,
        price: destination.price
      });
      Swal.fire('Ditambahkan!', 'Destinasi berhasil ditambahkan ke bookmark!', 'success');
      setIsBookmarked(true);
    } else {
      bookmarks = bookmarks.filter((item) => String(item.id) !== String(destination.id));
      Swal.fire('Dihapus', 'Destinasi dihapus dari bookmark.', 'info');
      setIsBookmarked(false);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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

    setIsSubmittingReview(true);
    try {
      const newReviewData = {
        rating: reviewForm.rating,
        review: reviewForm.review,
        userName: reviewForm.name 
      };
      const submittedReview = await apiSubmitRating(placeId, newReviewData.rating, newReviewData.review, newReviewData.userName);
      setReviews(prevReviews => [...prevReviews, submittedReview]);
      Swal.fire('Sukses!', 'Ulasan berhasil dikirim!', 'success');
      setReviewForm({ name: isAuthenticated && user ? (user.name || user.username || '') : '', review: '', rating: 0 });
    } catch (err) {
      console.error('Presenter: Failed to submit review:', err);
      Swal.fire('Gagal!', err.message || 'Gagal mengirim ulasan.', 'error');
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