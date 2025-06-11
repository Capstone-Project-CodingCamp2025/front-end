// src/presenter/useRegisterPresenter.js - Fixed with proper Google OAuth support
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export function useRegisterPresenter() {
  const { register: authRegister } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Swal.fire('Input Tidak Lengkap', 'Mohon isi semua field registrasi.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      await authRegister(username, email, password);
    } catch (err) {
      console.error("Presenter Register: Registrasi error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async (idToken) => {
    if (!idToken) {
      Swal.fire('Error', 'Token Google tidak valid', 'error');
      return;
    }

    setIsGoogleLoading(true);
    try {
      // Pass Google token to register function
      // Parameters: username, email, password, googleIdToken
      await authRegister(null, null, null, idToken);
    } catch (err) {
      console.error("Google Register error:", err);
      // Error handling is already done in AuthContext
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isGoogleLoading,
    handleRegister,
    handleGoogleRegister,
    setIsGoogleLoading,
  };
}