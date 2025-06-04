// login, register, cek token
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password }, {
      withCredentials: true 
    });
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
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Mengirim token dari localStorage
      }
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
