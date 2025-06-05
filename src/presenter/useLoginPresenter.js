// src/presenters/useLoginPresenter.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export function useLoginPresenter() {
  const { login: authLogin } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    if (!email || !password) {
        Swal.fire('Input Tidak Lengkap', 'Mohon isi email dan password.', 'warning');
        return;
    }
    setIsLoading(true);
    try {
      await authLogin(email, password);
    } catch (err) {
      console.error("Presenter Login: Login error:", err);
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