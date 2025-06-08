// kirim & ambil rating
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const AUTH_TOKEN = localStorage.getItem('authToken'); 

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
    const response = await axios.get(`${API_BASE_URL}/places/${placeId}/details`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReviewsForPlace = async (placeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`); 
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorBody.error || JSON.stringify(errorBody);
      } catch (error) {
        errorMessage = response.statusText || errorMessage;
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    return { data: data.reviews || [], error: null };
  } catch (error) {
    console.error(`Error fetching reviews for place ${placeId}:`, error);
    return { data: [], error: error.message || "Gagal mengambil ulasan." };
  }
};


// Fungsi untuk menambahkan ulasan baru
export const addReviewForPlace = async (placeId, rating, reviewText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`, 
      },
      body: JSON.stringify({ rating, reviewText }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorBody.error || JSON.stringify(errorBody);
      } catch (error) {
        errorMessage = response.statusText || errorMessage;
      }
      // Jika error karena pengguna sudah pernah review 
      if (response.status === 409) {
        errorMessage = "Anda sudah pernah memberikan ulasan untuk destinasi ini.";
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }
    const newReview = await response.json();
    return { data: newReview, error: null };
  } catch (error) {
    console.error(`Error adding review for place ${placeId}:`, error);
    return { data: null, error: error.message || "Gagal menambahkan ulasan." };
  }
};

