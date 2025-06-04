// destinasi dari model Place
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getAllPlaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places`);
    return response.data;
  } catch (error) {
    console.error("Model: Gagal mengambil semua tempat:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getPlaceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Model: Gagal mengambil tempat dengan ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Tambahkan fungsi lain pencarian, filter, dll.