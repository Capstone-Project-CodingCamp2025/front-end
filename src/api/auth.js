// src/api/auth.js - Complete API functions for authentication and password reset
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    
    const token = response.data.token;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Register function
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Forgot password - send OTP to email
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Reset password with OTP
export const resetPassword = async (email, newPassword, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { 
      email, 
      newPassword, 
      otp 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Resend OTP
export const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token'); // Remove token even if API call fails
    throw error.response?.data || { message: error.message };
  }
};

// Check authentication status
export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // If token is invalid, remove it
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
    }
    throw error.response?.data || { message: error.message };
  }
};