/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../../../api/auth'; // Import fungsi resetPassword
import Swal from 'sweetalert2'; // Impor Swal

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const otp = location.state?.otp || ''; // Ambil OTP dari state lokasi
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !otp) {
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan!',
        text: 'Email atau OTP tidak valid. Silakan mulai ulang proses reset password.',
      });
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Tidak Cocok!',
        text: 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.',
      });
      setLoading(false);
      return;
    }
    try {
      await resetPassword(email, newPassword, otp);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kata sandi Anda telah berhasil diatur ulang. Silakan login dengan kata sandi baru Anda.',
      });
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Gagal mengatur ulang kata sandi. Mohon coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-1 px-2 pt-20">
        <div className="w-full max-w-md overflow-hidden bg-white border border-black shadow-md rounded-xl">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="mb-4 text-lg font-semibold text-center">Create New Password</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                className="px-3 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="px-3 py-2 border rounded"
              />
              <button
                type="submit"
                className="py-2 mt-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500"
              >
                Save New Password
              </button>
              <div className="mt-2 text-sm text-center">
                Back to{' '}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}