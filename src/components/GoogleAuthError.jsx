// src/components/GoogleAuthError.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GoogleAuthError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const message = searchParams.get('message') || 'Login dengan Google gagal';
    
    Swal.fire({
      title: 'Login Gagal',
      text: message,
      icon: 'error'
    }).then(() => {
      navigate('/login');
    });
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default GoogleAuthError;