// src/presenters/useRegisterPresenter.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export function useRegisterPresenter() {
  const { register: authRegister } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleRegister,
  };
}