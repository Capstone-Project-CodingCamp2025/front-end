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
    
    // Test koneksi ke server terlebih dahulu
    try {
      await axios.get(`${API_BASE_URL}/places/${placeId}/details`);
      console.log('✅ Server connection OK');
    } catch (connectionError) {
      console.error('❌ Server connection failed:', connectionError);
      throw new Error('Tidak dapat terhubung ke server. Pastikan server backend berjalan di http://localhost:5000');
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
      // Server responded with error status
      const errorMessage = error.response.data?.message || error.response.data?.error || 'Gagal mengirim ulasan';
      console.log('Server error response:', {
        status: error.response.status,
        data: error.response.data
      });
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request made but no response
      console.log('Network error details:', {
        request: error.request,
        code: error.code,
        message: error.message
      });
      throw new Error('Tidak dapat terhubung ke server. Periksa apakah server backend berjalan di http://localhost:5000');
    } else {
      // Other error
      throw new Error(error.message || 'Terjadi kesalahan saat mengirim ulasan');
    }
  }
};

// Get semua reviews untuk tempat tertentu
export const getRatingsForPlace = async (placeId) => {
  console.log('=== GET RATINGS FOR PLACE API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    // Test dengan endpoint /details terlebih dahulu
    let response;
    try {
      response = await axios.get(`${API_BASE_URL}/places/${placeId}/details`, {
        withCredentials: true
      });
    } catch (detailsError) {
      console.log('Details endpoint failed, trying reviews endpoint');
      response = await axios.get(`${API_BASE_URL}/places/${placeId}/reviews`, {
        withCredentials: true
      });
    }
    
    console.log('✅ Reviews retrieved successfully:', response.data.length, 'reviews');
    return response.data; // Langsung return array reviews
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
    
    throw new Error(error.response?.data?.message || 'Gagal mengambil ulasan');
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
export const deleteReview = async (reviewId) => {
  console.log('=== DELETE REVIEW API CALL ===');
  console.log('Review ID:', reviewId);
  
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');
    }
    
    const response = await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`, {
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