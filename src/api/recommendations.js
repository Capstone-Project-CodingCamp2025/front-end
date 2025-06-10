// src/api/recommendations.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Ambil rekomendasi populer untuk opsi rating awal
export const getPopularRecommendations = async (limit = 20) => {
  const res = await axios.get(`${API_BASE_URL}/recommendations/popular?limit=${limit}`);
  return res.data.destinations;
};

// Get hybrid recommendations
export const getRecommendations = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    `${API_BASE_URL}/recommendations`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.destinations;
};
