import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp as apiVerifyOtp } from '../../src/api/auth';
import Swal from 'sweetalert2';

export function useOtpResetPresenter() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      Swal.fire('Error', 'Email tidak ditemukan. Silakan ulangi proses lupa kata sandi.', 'error');
      navigate('/forget-password');
    }
  }, [email, navigate]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        Swal.fire('Input Tidak Valid', 'Mohon masukkan 6 digit kode OTP.', 'warning');
        return;
    }
    setIsLoading(true);
    try {
      await apiVerifyOtp(email, otp); //
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'OTP berhasil diverifikasi. Sekarang Anda bisa mengatur kata sandi baru.',
      });
      navigate('/new-password', { state: { email, otp } });
    } catch (err) {
      console.error('Presenter OtpReset: OTP verification error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Verifikasi OTP gagal. Coba lagi atau minta OTP baru.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk kirim ulang OTP

  return {
    otp,
    setOtp,
    isLoading,
    email,
    handleVerifyOtp,
    // handleResendOtp, 
  };
}