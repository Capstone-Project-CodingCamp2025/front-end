// panggil hasil rekomendas
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getPopularRecommendations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations/popular`);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPersonalizedRecommendations = async (userId, preferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommendations/personalized`, {
      userId,
      preferences // Kirim preferensi pengguna untuk rekomendasi
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Jika rekomendasi personal membutuhkan otorisasi
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};