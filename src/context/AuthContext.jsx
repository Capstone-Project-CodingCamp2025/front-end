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
    console.log("AuthProvider: Stored token:", storedToken);
    if (storedToken) {
      try {
        const userData = await checkAuth(); 
        setUser(userData);
        setToken(storedToken);
        setIsAuthenticated(true); 
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('token');
        setIsAuthenticated(false); 
      }
    }
    setIsLoading(false);
  };
  verifyToken();
  }, []);

  const login = async (email, password) => {
  try {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    const userData = await checkAuth(); // Mendapatkan data pengguna
    console.log("AuthProvider: Login successful, user:", userData);
    setUser(userData);
    setIsAuthenticated(true);
    console.log("AuthProvider: isAuthenticated set to true after login");
    Swal.fire({
      title: 'Berhasil!',
      text: 'Login berhasil!',
      icon: 'success',
      timer: 2000, 
    showConfirmButton: false   });
    navigate('/user');
    return data;
  } catch (err) {
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
      navigate('/login'); // Arahkan ke halaman login setelah registrasi
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

  const logout = async () => {
    try {
      await apiLogout(); // Panggil API logout
    } catch (error) {
      console.error("API Logout error:", error);
    }
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    Swal.fire({
    title: 'Logout',
    text: 'Anda telah berhasil logout.',
    icon: 'info',
    timer: 2000,
    showConfirmButton: false
  });
    navigate('/'); // Arahkan ke halaman utama setelah logout
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