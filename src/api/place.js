import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getAllPlaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places`);
    console.log('Places loaded:', response.data.length);
    console.log('Sample place images:', response.data.slice(0, 1).map(p => ({
      name: p.name,
      mainImage: p.image,
      allImages: p.allImages
    })));
    return response.data;
  } catch (error) {
    console.error("Model: Gagal mengambil semua tempat:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getPlaceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/${id}`);
    console.log('Place detail loaded:', response.data.name);
    console.log('Place images:', response.data.allImages);
    return response.data;
  } catch (error) {
    console.error(`Model: Gagal mengambil tempat dengan ID ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};