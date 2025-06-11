// src/components/GoogleAuthSuccess.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store token
      localStorage.setItem('token', token);
      
      // Show success message
      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Selamat datang di SIRESITA',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        // Redirect to dashboard
        navigate('/first-recommendation');
      });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, updateUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memproses login...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;