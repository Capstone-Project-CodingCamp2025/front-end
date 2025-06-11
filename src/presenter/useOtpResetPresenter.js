// presenter/useOtpResetPresenter.js - Updated dengan fungsi resend OTP
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp as apiVerifyOtp, resendOtp as apiResendOtp } from '../../src/api/auth';
import Swal from 'sweetalert2';

export function useOtpResetPresenter() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!email) {
      Swal.fire('Error', 'Email tidak ditemukan. Silakan ulangi proses lupa kata sandi.', 'error');
      navigate('/forget-password');
    }
  }, [email, navigate]);

  // Countdown untuk tombol resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        Swal.fire('Input Tidak Valid', 'Mohon masukkan 6 digit kode OTP.', 'warning');
        return;
    }
    setIsLoading(true);
    try {
      await apiVerifyOtp(email, otp);
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

  const handleResendOtp = async () => {
    if (countdown > 0) return; // Masih dalam countdown
    
    setIsResendingOtp(true);
    try {
      await apiResendOtp(email);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kode OTP baru telah dikirim ke email Anda.',
      });
      setCountdown(60); // Set countdown 60 detik
      setOtp(''); // Reset input OTP
    } catch (err) {
      console.error('Presenter OtpReset: Resend OTP error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Gagal mengirim ulang OTP. Coba lagi nanti.',
      });
    } finally {
      setIsResendingOtp(false);
    }
  };

  return {
    otp,
    setOtp,
    isLoading,
    email,
    handleVerifyOtp,
    handleResendOtp,
    isResendingOtp,
    countdown,
  };
}