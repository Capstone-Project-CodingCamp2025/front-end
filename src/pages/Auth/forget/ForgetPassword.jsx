/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useForgetPasswordPresenter } from '../../../presenter/useForgetPasswordPresenter';

export default function ForgetPassword() {
  const {
    email,
    setEmail,
    isLoading,
    handleSendResetLink,
  } = useForgetPasswordPresenter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSendResetLink();
  };

  return (
    <main className="flex flex-col min-h-screen"> {/* Di AuthLayout, jadi styling ini mungkin tidak perlu */}
      <div className="flex items-center justify-center flex-1 px-2 pt-20"> {/* Sesuaikan dengan AuthLayout */}
        <div className="w-full max-w-md overflow-hidden bg-white border shadow-xl rounded-2xl"> {/* Styling konsisten */}
          <div className="flex flex-col justify-center p-6 md:p-10">
            <Link to="/" className="self-center mb-6 text-2xl font-bold text-blue-600">
              SIRESITA
            </Link>
            <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Lupa Kata Sandi?</h2>
            <p className="mb-6 text-sm text-center text-gray-600">
              Masukkan email Anda untuk menerima kode OTP.
            </p>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-forget" className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email-forget"
                  placeholder="kamu@contoh.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-3 font-semibold text-white transition-all duration-300 transform rounded-lg ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Mengirim...' : 'Kirim Kode OTP'}
              </button>
              <div className="mt-4 text-sm text-center text-gray-600">
                Ingat kata sandi Anda?{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}