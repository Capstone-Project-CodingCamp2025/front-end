// src/components/GoogleSignIn.jsx - Fixed version
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GoogleSignIn = ({ onLoading }) => {
  const { login } = useAuth(); // Menggunakan login dari AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In API
    const loadGoogleSignIn = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signin_with',
          locale: 'id'
        }
      );
    };

    loadGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async (response) => {
    try {
      onLoading?.(true);
      
      // FIXED: Menggunakan login dari AuthContext dengan Google token
      await login(null, null, response.credential);
      
      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Selamat datang di SIRESITA',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      navigate('/first-recommendation');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      Swal.fire({
        title: 'Login Gagal',
        text: error.message || 'Terjadi kesalahan saat login dengan Google',
        icon: 'error'
      });
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <div className="w-full">
      <div id="google-signin-button" className="w-full flex justify-center"></div>
    </div>
  );
};

export default GoogleSignIn;