/* eslint-disable no-unused-vars */
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';
import { verifyOtp } from '../../../api/auth'; // Import fungsi verifyOtp
import Swal from 'sweetalert2'; // Impor Swal

export default function OtpReset() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Ambil email dari state lokasi
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Email Tidak Ditemukan',
        text: 'Email tidak ditemukan. Silakan kembali ke halaman lupa password.',
      });
      setLoading(false);
      return;
    }
    try {
      await verifyOtp(email, otp);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'OTP berhasil diverifikasi. Sekarang Anda bisa mengatur kata sandi baru.',
      });
      navigate('/new-password', { state: { email, otp } }); // Kirim email dan OTP ke halaman New Password
    } catch (err) {
      console.error('OTP verification error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message || 'Verifikasi OTP gagal. Coba lagi.',
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
            <h2 className="mb-4 text-lg font-semibold text-center">Enter OTP Code</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="px-3 py-2 tracking-widest text-center border rounded"
              />
              <button
                type="submit"
                className="py-2 mt-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500"
              >
                Verify OTP
              </button>
              <div className="mt-2 text-sm text-center">
                Didn't receive the code?{' '}
                <button type="button" className="p-0 m-0 text-blue-600 bg-transparent border-none hover:underline">Resend</button>
              </div>
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