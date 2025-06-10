import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Konfigurasi axios default
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('token') || localStorage.getItem('authToken');

// Submit review/rating untuk tempat tertentu
export const submitRating = async (placeId, rating, review, userName) => {
  console.log('=== SUBMIT RATING API CALL ===');
  console.log('Place ID:', placeId, 'Rating:', rating, 'Review:', review, 'UserName:', userName);
  
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/places/${placeId}/ratings`,
      {
        rating: parseFloat(rating),
        review: review,
        userName: userName
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    
    console.log('✅ Rating submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error submitting rating:', error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Gagal mengirim ulasan';
      console.log('Server error response:', {
        status: error.response.status,
        data: error.response.data
      });
      throw new Error(errorMessage);
    } else if (error.request) {
      console.log('Network error details:', {
        request: error.request,
        code: error.code,
        message: error.message
      });
      throw new Error('Tidak dapat terhubung ke server. Periksa apakah server backend berjalan di http://localhost:5000');
    } else {
      throw new Error(error.message || 'Terjadi kesalahan saat mengirim ulasan');
    }
  }
};

// Submit initial ratings array of { place_id, rating }
export const submitInitialRatings = async (ratings) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    `${API_BASE_URL}/initial-ratings`,
    ratings,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Get semua reviews untuk tempat tertentu - FIXED
export const getRatingsForPlace = async (placeId) => {
  console.log('=== GET RATINGS FOR PLACE API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    // Langsung gunakan endpoint reviews yang benar
    const response = await axios.get(`${API_BASE_URL}/places/${placeId}/reviews`, {
      withCredentials: true
    });
    
    console.log('✅ Reviews retrieved successfully:', response.data.length, 'reviews');
    console.log('Sample reviews:', response.data.slice(0, 2));
    
    // Pastikan return array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('❌ Error getting ratings for place:', error);
    
    if (error.response?.status === 404) {
      console.log('No reviews found for place, returning empty array');
      return [];
    }
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - server might not be running');
      return [];
    }
    
    // Jangan throw error, return empty array agar UI tidak crash
    console.log('Returning empty array due to error');
    return [];
  }
};

// Test koneksi server
export const testServerConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
      withCredentials: true
    });
    return { connected: true, message: 'Server connected' };
  } catch (error) {
    return { 
      connected: false, 
      message: `Server not reachable: ${error.message}` 
    };
  }
};

// Get reviews milik user yang sedang login
export const getUserReviews = async () => {
  console.log('=== GET USER REVIEWS API CALL ===');
  
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');
    }
    
    const response = await axios.get(`${API_BASE_URL}/user/reviews`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    
    console.log('✅ User reviews retrieved successfully:', response.data.length, 'reviews');
    return response.data;
  } catch (error) {
    console.error('❌ Error getting user reviews:', error);
    throw new Error(error.response?.data?.message || 'Gagal mengambil ulasan pengguna');
  }
};

// Delete review
export const deleteReview = async (placeId) => {
  console.log('=== DELETE REVIEW API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');
    }
    
    const response = await axios.delete(`${API_BASE_URL}/reviews/place/${placeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
    
    console.log('✅ Review deleted successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    throw new Error(error.response?.data?.message || 'Gagal menghapus ulasan');
  }
};