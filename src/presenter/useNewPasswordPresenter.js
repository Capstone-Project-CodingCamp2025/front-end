import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword as apiResetPassword } from '../../src/api/auth';
import Swal from 'sweetalert2';

export function useNewPasswordPresenter() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const otp = location.state?.otp || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
      Swal.fire('Error', 'Informasi tidak lengkap. Silakan ulangi proses lupa kata sandi.', 'error');
      navigate('/forget-password');
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire('Input Tidak Lengkap', 'Mohon isi kedua field kata sandi.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire('Tidak Cocok', 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await apiResetPassword(email, newPassword, otp); //
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kata sandi Anda telah berhasil diatur ulang. Silakan login dengan kata sandi baru Anda.',
      });
      navigate('/login');
    } catch (err) {
      console.error('Presenter NewPassword: Reset password error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Gagal mengatur ulang kata sandi. Mohon coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleResetPassword,
  };
}