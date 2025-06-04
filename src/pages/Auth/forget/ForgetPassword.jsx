/* eslint-disable no-unused-vars */
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { forgotPassword } from '../../../api/auth';
import { toast } from 'react-toastify'; // Import fungsi forgotPassword

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success('Link reset telah dikirim ke email Anda. Silakan cek kotak masuk Anda.');
      navigate('/otp-reset', { state: { email } }); // Kirim email ke halaman OTP
    } catch (err) {
      console.error('Forgot password error:', err);
      toast.error(err.message || 'Gagal mengirim link reset. Pastikan email benar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-1 px-2 pt-20">
        <div className="w-full max-w-md overflow-hidden bg-white border border-black shadow-md rounded-xl">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="mb-4 text-lg font-semibold text-center">Forget Password</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border rounded"
              />
              <button
                type="submit"
                className="py-2 mt-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500"
              >
                Send Reset Link
              </button>
              <div className="mt-2 text-sm text-center">
                Remember your password?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}