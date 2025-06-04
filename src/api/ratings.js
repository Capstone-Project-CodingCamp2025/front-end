// kirim & ambil rating
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const submitRating = async (placeId, rating, review, userName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/places/${placeId}/ratings`, {
      rating,
      review,
      userName 
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRatingsForPlace = async (placeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/${placeId}/ratings`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};