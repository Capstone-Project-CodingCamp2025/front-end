// src/presenters/useLoginPresenter.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useLoginPresenter() {
  const { login: authLogin } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      // Tambahkan error handling yang lebih baik
      Swal.fire({
        title: 'Login Gagal',
        text: err.message || 'Terjadi kesalahan saat login',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
  };
}