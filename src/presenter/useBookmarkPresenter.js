import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { 
  getUserBookmarks, 
  removeBookmark as apiRemoveBookmark 
} from '../api/bookmark';

export function useBookmarkPresenter() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();

  // Enhanced token validation
  const validateToken = useCallback(() => {
    const localStorageToken = localStorage.getItem('authToken');
    const contextToken = token;
    
    console.log('=== BOOKMARK TOKEN VALIDATION ===');
    console.log('LocalStorage token:', localStorageToken ? `${localStorageToken.substring(0, 20)}...` : 'null');
    console.log('Context token:', contextToken ? `${contextToken.substring(0, 20)}...` : 'null');
    console.log('isAuthenticated:', isAuthenticated);
    
    // Sync tokens if needed
    if (contextToken && !localStorageToken) {
      console.log('🔄 Syncing token from context to localStorage');
      localStorage.setItem('authToken', contextToken);
      return contextToken;
    }
    
    if (localStorageToken && !contextToken) {
      console.log('🔄 Using localStorage token as fallback');
      return localStorageToken;
    }
    
    return localStorageToken || contextToken;
  }, [token, isAuthenticated]);

  // FIXED: Improved data normalization function
  const normalizeBookmarkData = useCallback((bookmarkData) => {
    console.log('🔄 Normalizing bookmark data:', bookmarkData);
    
    if (!bookmarkData || typeof bookmarkData !== 'object') {
      console.warn('⚠️ Invalid bookmark data:', bookmarkData);
      return null;
    }

    // FIXED: Handle nested place structure correctly
    const place = bookmarkData.place || bookmarkData;
    
    // Comprehensive field mapping untuk berbagai kemungkinan struktur data
    const normalized = {
      // FIXED: ID mapping - prioritize place.id
      id: place.id || 
          bookmarkData.place_id || 
          place.place_id || 
          bookmarkData.id || 
          bookmarkData.destination_id,

      // FIXED: Name mapping - prioritize place.name
      name: place.name || 
            place.nama_tempat || 
            bookmarkData.place_name || 
            bookmarkData.name || 
            bookmarkData.nama_tempat ||
            bookmarkData.destination_name ||
            'Nama tidak tersedia',

      // FIXED: Image mapping - prioritize place.image
      image: place.image || 
             place.gambar ||
             bookmarkData.place_image || 
             bookmarkData.image || 
             bookmarkData.gambar ||
             bookmarkData.destination_image ||
             '/api/placeholder/400/300',

      // FIXED: Location mapping - prioritize place.location
      location: place.location || 
                place.alamat ||
                bookmarkData.place_location || 
                bookmarkData.location || 
                bookmarkData.alamat ||
                bookmarkData.destination_location ||
                'Lokasi tidak tersedia',

      // FIXED: Rating mapping - prioritize place.rating
      rating: place.rating || 
              bookmarkData.place_rating || 
              bookmarkData.rating ||
              bookmarkData.destination_rating ||
              null,

      // FIXED: Price mapping - prioritize place.price
      price: place.price || 
             bookmarkData.place_price || 
             bookmarkData.price ||
             bookmarkData.destination_price ||
             null,

      // FIXED: Category mapping - prioritize place.category
      kategori: place.category || 
                place.kategori ||
                bookmarkData.place_category || 
                bookmarkData.kategori || 
                bookmarkData.category ||
                bookmarkData.destination_category ||
                null,

      // FIXED: Description mapping - prioritize place.description
      description: place.description ||
                   place.deskripsi ||
                   bookmarkData.place_description ||
                   bookmarkData.description ||
                   bookmarkData.deskripsi ||
                   null,

      // Timestamp
      bookmarked_at: bookmarkData.bookmarked_at ||
                     bookmarkData.created_at || 
                     bookmarkData.timestamp ||
                     new Date().toISOString(),

      // Bookmark metadata
      bookmark_id: bookmarkData.bookmark_id || bookmarkData.id,
      place_id: bookmarkData.place_id || place.id,

      // Keep original data for debugging
      _original: bookmarkData,
      _place: place
    };

    console.log('✅ Normalized bookmark:', {
      id: normalized.id,
      name: normalized.name,
      image: normalized.image ? 'YES' : 'NO',
      location: normalized.location,
      place_id: normalized.place_id,
      bookmark_id: normalized.bookmark_id
    });

    return normalized;
  }, []);

  const loadBookmarks = useCallback(async () => {
    console.log('=== LOADING BOOKMARKS ===');
    setIsLoading(true);
    
    try {
      if (isAuthenticated) {
        // Validate token before API call
        const validToken = validateToken();
        
        if (validToken) {
          console.log('🌐 Loading bookmarks from database...');
          try {
            const response = await getUserBookmarks();
            console.log('📦 Raw API response:', response);
            
            // Handle different response structures
            let bookmarksData = [];
            
            if (response && response.data) {
              if (Array.isArray(response.data)) {
                bookmarksData = response.data;
              } else if (response.data.bookmarks && Array.isArray(response.data.bookmarks)) {
                bookmarksData = response.data.bookmarks;
              } else if (response.data.data && Array.isArray(response.data.data)) {
                bookmarksData = response.data.data;
              }
            } else if (Array.isArray(response)) {
              bookmarksData = response;
            }
            
            console.log('📊 Extracted bookmarks data:', bookmarksData.length, 'items');
            console.log('📋 Sample bookmark data:', bookmarksData[0]);
            
            // FIXED: Normalize each bookmark data
            const normalizedBookmarks = bookmarksData
              .map(bookmark => normalizeBookmarkData(bookmark))
              .filter(bookmark => {
                // FIXED: More flexible validation
                const isValid = bookmark !== null && 
                               (bookmark.id || bookmark.place_id || bookmark.bookmark_id);
                
                if (!isValid) {
                  console.warn('⚠️ Invalid bookmark filtered out:', bookmark);
                }
                
                return isValid;
              });
            
            console.log('✅ Normalized bookmarks:', normalizedBookmarks.length, 'valid items');
            
            // Log sample normalized data for debugging
            if (normalizedBookmarks.length > 0) {
              console.log('📋 Sample normalized bookmark:', {
                id: normalizedBookmarks[0].id,
                name: normalizedBookmarks[0].name,
                image: normalizedBookmarks[0].image,
                location: normalizedBookmarks[0].location,
                rating: normalizedBookmarks[0].rating,
                place_id: normalizedBookmarks[0].place_id
              });
            }
            
            setBookmarks(normalizedBookmarks);
            
            // Sync with localStorage for backward compatibility
            localStorage.setItem("bookmarks", JSON.stringify(normalizedBookmarks));
            
          } catch (apiError) {
            console.log('❌ Database bookmarks failed:', apiError);
            console.log('🔄 Falling back to localStorage...');
            
            // Fallback to localStorage
            const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
            console.log('📱 localStorage bookmarks:', savedBookmarks.length);
            setBookmarks(savedBookmarks);
          }
        } else {
          console.log('⚠️ No valid token, using localStorage');
          const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
          setBookmarks(savedBookmarks);
        }
      } else {
        console.log('📱 Not authenticated, using localStorage');
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarks(savedBookmarks);
      }
    } catch (error) {
      console.error("❌ Presenter: Error loading bookmarks", error);
      
      // Final fallback to localStorage
      try {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarks(savedBookmarks);
      } catch (localStorageError) {
        console.error("❌ LocalStorage error:", localStorageError);
        setBookmarks([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, validateToken, normalizeBookmarkData]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const handleRemoveBookmark = async (id) => {
    if (!id) {
      console.error('❌ No ID provided for bookmark removal');
      return;
    }

    console.log('=== REMOVING BOOKMARK ===');
    console.log('Bookmark ID:', id);
    console.log('Authenticated:', isAuthenticated);

    try {
      const result = await Swal.fire({
        title: 'Hapus Bookmark?',
        text: "Apakah Anda yakin ingin menghapus destinasi ini dari bookmark?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        reverseButtons: true
      });

      if (!result.isConfirmed) {
        console.log('🚫 User cancelled bookmark removal');
        return;
      }

      if (isAuthenticated) {
        const validToken = validateToken();
        
        if (validToken) {
          console.log('🗑️ Removing bookmark from database...');
          try {
            await apiRemoveBookmark(id);
            console.log('✅ Bookmark removed from database');
          } catch (apiError) {
            console.log('⚠️ API removal failed:', apiError);
            // Continue with local removal even if API fails
          }
        }
      }

      // FIXED: Remove from local state with better ID matching
      const updatedBookmarks = bookmarks.filter((item) => {
        const itemId = item.id || item.place_id || item.bookmark_id;
        const targetId = String(id);
        const itemIdStr = String(itemId);
        
        const shouldKeep = itemIdStr !== targetId;
        
        if (!shouldKeep) {
          console.log('🗑️ Removing bookmark:', {
            itemId: itemIdStr,
            targetId: targetId,
            name: item.name
          });
        }
        
        return shouldKeep;
      });
      
      console.log('📝 Updated bookmarks count:', updatedBookmarks.length);
      setBookmarks(updatedBookmarks);
      
      // Update localStorage
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      
      Swal.fire({
        title: 'Dihapus!',
        text: 'Destinasi telah dihapus dari bookmark.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('❌ Error removing bookmark:', error);
      
      if (error.statusCode === 401) {
        Swal.fire({
          title: 'Session Berakhir',
          text: 'Sesi login Anda telah berakhir. Silakan login kembali.',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Login Kembali'
        }).then(() => {
          localStorage.removeItem('authToken');
          navigate('/login');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Gagal menghapus bookmark. Silakan coba lagi.',
          icon: 'error',
          confirmButtonColor: '#3085d6'
        });
      }
    }
  };

  const navigateToDestination = useCallback((destinationId) => {
    console.log("=== NAVIGATION ===");
    console.log("Navigating to destination:", destinationId);
    
    if (destinationId === undefined || destinationId === null) {
      console.error("❌ Error: destinationId is undefined or null");
      Swal.fire({
        title: 'Error',
        text: 'ID destinasi tidak valid.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
      return; 
    }
    
    // Navigate to destination detail page
    navigate(`/destination/${destinationId}`);
    
    // Scroll to top of page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [navigate]);

  // Helper function to refresh bookmarks
  const refreshBookmarks = useCallback(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  return {
    bookmarks,
    isLoading,
    handleRemoveBookmark,
    navigateToDestination,
    refreshBookmarks,
    isAuthenticated,
    user
  };
}