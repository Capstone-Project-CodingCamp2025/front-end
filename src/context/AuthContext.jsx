// src/context/AuthContext.jsx - Fixed with Google register support
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  loginUser,
  registerUser,
  loginWithGoogleToken,
  registerWithGoogleToken, // NEW: Import Google register function
  checkAuth,
  logoutUser as apiLogout,
} from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- State ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- On mount: verify stored token & fetch user ---
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const resp = await checkAuth();
          if (resp.status === 'success') {
            setUser(resp.data.user);
            setIsAuthenticated(true);
            setToken(storedToken);
          } else {
            throw new Error('Auth check failed');
          }
        } catch (err) {
          console.warn('AuthProvider: invalid token, clearing...', err);
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // --- Login method - FIXED: Only for existing users ---
  const login = async (email, password, googleIdToken = null) => {
    try {
      let resp;
      if (googleIdToken) {
        // For Google login, use the Google token directly - ONLY for existing users
        resp = await loginWithGoogleToken(googleIdToken);
      } else {
        // Regular email/password login
        resp = await loginUser(email, password);
      }

      if (resp.status === 'success' && resp.data.token) {
        // Store token and update state
        localStorage.setItem('authToken', resp.data.token);
        setToken(resp.data.token);
        setUser(resp.data.user);
        setIsAuthenticated(true);
        
        Swal.fire({ 
          icon: 'success', 
          title: 'Login berhasil!', 
          timer: 1500, 
          showConfirmButton: false 
        });
        return resp;
      }
      throw new Error(resp.message || 'Login gagal');
    } catch (err) {
      console.error('AuthContext.login error:', err);
      
      // Handle specific Google login errors
      if (err.message && err.message.includes('belum terdaftar')) {
        Swal.fire({ 
          icon: 'warning', 
          title: 'Akun Belum Terdaftar', 
          text: 'Akun dengan email ini belum terdaftar. Silakan daftar terlebih dahulu.',
          showCancelButton: true,
          confirmButtonText: 'Daftar Sekarang',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/register');
          }
        });
      } else {
        Swal.fire({ 
          icon: 'error', 
          title: 'Gagal login', 
          text: err.message || 'Terjadi kesalahan saat login', 
        });
      }
      
      setIsAuthenticated(false);
      throw err;
    }
  };

  // --- Register (email/password) ---
  const register = async (username, email, password, googleIdToken = null) => {
    try {
      let resp;
      if (googleIdToken) {
        // NEW: Google registration - Only for new users
        resp = await registerWithGoogleToken(googleIdToken);
      } else {
        // Regular email/password registration
        resp = await registerUser(username, email, password);
      }

      Swal.fire({ 
        icon: 'success', 
        title: 'Registrasi berhasil!', 
        text: googleIdToken ? 'Silakan login dengan Google.' : 'Silakan login.', 
        timer: 1500, 
        showConfirmButton: false 
      });
      navigate('/login');
      return resp;
    } catch (err) {
      console.error('AuthContext.register error:', err);
      
      // Handle specific Google register errors
      if (err.message && err.message.includes('sudah terdaftar')) {
        Swal.fire({ 
          icon: 'warning', 
          title: 'Email Sudah Terdaftar', 
          text: 'Email sudah terdaftar. Silakan login.',
          showCancelButton: true,
          confirmButtonText: 'Login Sekarang',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
        Swal.fire({ 
          icon: 'error', 
          title: 'Gagal registrasi', 
          text: err.message || 'Terjadi kesalahan saat registrasi', 
        });
      }
      
      throw err;
    }
  };

  // --- Logout with automatic navigation ---
  const logout = async () => {
    console.log('AuthContext.logout: start');
    try {
      await apiLogout();
    } catch (e) {
      console.warn('apiLogout failed:', e);
    }
    
    // Clear state & storage
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');

    // Clean any stray auth keys
    Object.keys(localStorage).forEach((key) => {
      if (/(auth|token|user)/i.test(key)) {
        localStorage.removeItem(key);
      }
    });

    // Disable google auto-select
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }

    // Navigate to appropriate page after logout
    const currentPath = location.pathname;
    const protectedRoutes = ['/user', '/bookmark', '/profile'];
    
    // If user is on a protected route, redirect to home
    if (protectedRoutes.some(route => currentPath.startsWith(route))) {
      navigate('/', { replace: true });
    } else {
      // If on public page, force refresh to update UI
      window.location.reload();
    }

    console.log('AuthContext.logout: done');
  };

  // --- Update partial user data in context ---
  const updateUser = (patch) => {
    setUser((u) => u ? { ...u, ...patch } : patch);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};