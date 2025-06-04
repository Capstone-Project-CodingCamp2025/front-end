import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword as apiForgotPassword } from '../../src/api/auth';
import Swal from 'sweetalert2';

export function useForgetPasswordPresenter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Swal.fire('Input Tidak Lengkap', 'Mohon isi alamat email Anda.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      await apiForgotPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Terkirim!',
        text: 'Link reset atau kode OTP telah dikirim ke email Anda. Silakan cek kotak masuk Anda.',
      });
      navigate('/otp-reset', { state: { email } }); // Kirim email ke halaman OTP
    } catch (err) {
      console.error('Presenter ForgetPassword: Error sending reset link:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Gagal mengirim link reset. Pastikan email benar dan terdaftar.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    handleSendResetLink,
  };
}