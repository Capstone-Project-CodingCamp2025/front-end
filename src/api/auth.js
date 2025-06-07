// login, register, cek token
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    
    const token = response.data.token; // Pastikan backend mengembalikan { token: '...' }

    // Simpan token ke localStorage/sessionStorage atau state management (e.g., Redux)
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (email, newPassword, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { email, newPassword, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  
  console.log('checkAuth: Token from localStorage:', token); // Debug log
  
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pastikan format Bearer benar
      },
    });
    return response.data;
  } catch (error) {
    console.error('checkAuth error:', error);
    throw error.response?.data || error.message;
  }
};

