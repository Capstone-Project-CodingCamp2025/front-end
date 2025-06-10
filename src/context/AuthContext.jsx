// untuk mengingat status user login atau tidak di semua page
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, checkAuth, logoutUser as apiLogout } from '../api/auth'; //
import Swal from 'sweetalert2';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Untuk loading awal cek auth
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      console.log("AuthProvider: Verifying token...");
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          const userData = await checkAuth(); 
          setUser(userData);
          setToken(storedToken);
          setIsAuthenticated(true); 
        } catch (error) {
          console.error("Auth check failed:", error);
          // Clear invalid token
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false); 
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    
    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      console.log('Login response data:', data); // Debug response
      console.log('Token received:', data.token); // Debug token
      
      localStorage.setItem('token', data.token);
      console.log('Token saved to localStorage:', localStorage.getItem('token')); // Debug save
      
      setToken(data.token);
      
      const userData = await checkAuth(); 
      console.log("AuthProvider: Login successful, user:", userData);
      setUser(userData);
      setIsAuthenticated(true);
      
      Swal.fire({
        title: 'Berhasil!',
        text: 'Login berhasil!',
        icon: 'success',
        timer: 2000, 
        showConfirmButton: false   
      });
      
      return data;
    } catch (err) {
      console.error("Login error in AuthContext:", err);
      Swal.fire({
        title: 'Gagal!',
        text: err.message || 'Login gagal. Periksa kredensial Anda.',
        icon: 'error',
      });
      setIsAuthenticated(false); 
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      const data = await registerUser(username, email, password); //
      Swal.fire({
     title: 'Berhasil!',
     text: 'Registrasi berhasil! Silakan login.',
     icon: 'success',
   });
      navigate('/login'); 
      return data;
    } catch (err) {
      Swal.fire({
     title: 'Gagal!',
     text: err.message || 'Registrasi gagal. Mohon coba lagi.',
     icon: 'error',
   });
      throw err;
    }
  };

  // AuthContext.js - Perbaiki logout function
  const logout = () => {
    console.log('=== LOGOUT PROCESS ===');
    console.log('Current user before logout:', user);
    console.log('Current token before logout:', token ? `${token.substring(0, 20)}...` : 'null');
    
    // Clear all auth data
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    
    // Clear any other auth-related localStorage items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('auth') || key.includes('token') || key.includes('user'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log('✅ Logout completed');
    console.log('User after logout:', null);
    console.log('Token after logout:', null);
    
    // Optional: Redirect to login or home
    // navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};