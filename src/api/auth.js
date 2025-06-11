// src/api/auth.js - Updated with Google register support
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

// Login function
export const loginUser = async (email, password) => {
  try {
    console.log('🔐 Attempting login for:', email);
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    
    const token = response.data.data.token;
    console.log('✅ Login successful, storing token:', token.substring(0, 20) + '...');
    
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

// Google OAuth login - get auth URL
export const getGoogleAuthUrl = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/google`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Google OAuth login with ID token (from Google Sign-In button) - FIXED: Only for existing users
export const loginWithGoogleToken = async (idToken) => {
  try {
    console.log('🔐 Attempting Google login with token');
    const response = await axios.post(`${API_BASE_URL}/auth/google/token`, { 
      idToken 
    });
    
    const token = response.data.data.token;
    console.log('✅ Google login successful, storing token:', token.substring(0, 20) + '...');
    
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    console.error('❌ Google login error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

// NEW: Google OAuth register with ID token (from Google Sign-In button) - Only for new users
export const registerWithGoogleToken = async (idToken) => {
  try {
    console.log('📝 Attempting Google registration with token');
    const response = await axios.post(`${API_BASE_URL}/auth/google/register`, { 
      idToken 
    });
    
    console.log('✅ Google registration successful');
    return response.data;
  } catch (error) {
    console.error('❌ Google registration error:', error.response?.data || error.message);
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
    const token = localStorage.getItem('authToken');
    const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {};
    
    const response = await axios.post(`${API_BASE_URL}/logout`, {}, config);
    
    localStorage.removeItem('authToken');
    console.log('🚪 Logout successful, token removed');
    
    return response.data;
  } catch (error) {
    console.warn('⚠️ Logout API failed, but removing token anyway');
    localStorage.removeItem('authToken');
    throw error.response?.data || { message: error.message };
  }
};

// Check authentication status
export const checkAuth = async () => {
  const token = localStorage.getItem('authToken');
  
  console.log('🔍 Checking auth with token:', token ? token.substring(0, 20) + '...' : 'NONE');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('✅ Auth check successful:', response.data.data?.user?.email);
    return response.data;
  } catch (error) {
    console.error('❌ Auth check failed:', error.response?.status, error.response?.data);
    
    // If token is invalid, remove it
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('🗑️ Removing invalid token');
      localStorage.removeItem('authToken');
    }
    throw error.response?.data || { message: error.message };
  }
};