// src/components/GoogleRegister.jsx - Fixed Google Sign-In component for registration
import { useEffect } from 'react';
import { useRegisterPresenter } from '../presenter/useRegisterPresenter';

const GoogleRegister = ({ onLoading }) => {
  const { handleGoogleRegister } = useRegisterPresenter();

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
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-register-button'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signup_with',
          locale: 'id'
        }
      );
    };

    loadGoogleSignIn();

    // Cleanup function
    return () => {
      // Remove Google button if component unmounts
      const button = document.getElementById('google-register-button');
      if (button) {
        button.innerHTML = '';
      }
    };
  }, []);

  const handleGoogleCallback = async (response) => {
    try {
      onLoading?.(true);
      await handleGoogleRegister(response.credential);
    } catch (error) {
      console.error('Google Register callback error:', error);
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <div className="w-full">
      <div id="google-register-button" className="w-full flex justify-center"></div>
    </div>
  );
};

export default GoogleRegister;