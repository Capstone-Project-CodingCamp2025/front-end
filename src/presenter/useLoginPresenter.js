// src/presenters/useLoginPresenter.js - Updated with Google OAuth support
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useLoginPresenter() {
  const { login: authLogin } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
        Swal.fire('Input Tidak Lengkap', 'Mohon isi email dan password.', 'warning');
        return;
    }
    setIsLoading(true);
    try {
      await authLogin(email, password);
      navigate('/first-recommendation');
    } catch (err) {
      console.error("Presenter Login: Login error:", err);
      Swal.fire({
        title: 'Login Gagal',
        text: err.message || 'Terjadi kesalahan saat login',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken) => {
    setIsGoogleLoading(true);
    try {
      await authLogin(null, null, idToken); // Pass idToken as third parameter
      navigate('/first-recommendation');
    } catch (err) {
      console.error("Presenter Google Login: Login error:", err);
      Swal.fire({
        title: 'Login dengan Google Gagal',
        text: err.message || 'Terjadi kesalahan saat login dengan Google',
        icon: 'error'
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isGoogleLoading,
    handleLogin,
    handleGoogleLogin,
    setIsGoogleLoading
  };
}