// src/components/Register.jsx - Updated with Google OAuth support
import { Link } from 'react-router-dom';
import { useRegisterPresenter } from '../../presenter/useRegisterPresenter';
import GoogleRegister from '../../components/GoogleRegister';

export default function Register() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isGoogleLoading,
    handleRegister,
    setIsGoogleLoading,
  } = useRegisterPresenter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister();
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
        <div className="relative hidden w-full md:w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1653992145035-718b18fab561?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Inspirasi perjalanan untuk akun baru"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-blue-600 to-purple-600"></div>
        </div>

        <div className="flex flex-col justify-center w-full p-8 md:w-1/2 lg:p-12">
          <div className="mb-6 md:mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800 group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-block mb-6 text-2xl font-bold text-blue-600">
              SIRESITA
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Buat Akun Baru
            </h1>
            <p className="mt-2 text-gray-600">
              Daftar dan mulai rencanakan perjalanan impianmu.
            </p>
          </div>

          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username-register"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username-register"
                placeholder="username_unik"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <label
                htmlFor="email-register"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email-register"
                placeholder="kamu@contoh.com"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <label
                htmlFor="password-register"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password-register"
                placeholder="••••••••"
                className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className={`w-full py-3 mt-3 font-semibold text-white transition-all duration-300 transform rounded-lg ${
                isLoading || isGoogleLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              {isLoading ? 'Sedang Daftar...' : isGoogleLoading ? 'Memproses...' : 'Register'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau daftar dengan google</span>
              </div>
            </div>

            {/* Google Register Button */}
            <div>
              <GoogleRegister onLoading={setIsGoogleLoading} />
            </div>

            <div className="mt-4 text-sm text-center text-gray-600">
              Sudah punya akun?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}