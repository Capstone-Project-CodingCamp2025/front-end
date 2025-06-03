import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        alert('Login berhasil!');
        navigate('/user');
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan koneksi ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
        {/* Form Login */}
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mb-8 text-center md:text-left">
            <Link
              to="/"
              className="inline-block mb-6 text-2xl font-bold text-blue-600"
            >
              SIRESITA
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Selamat Datang Kembali!
            </h1>
            <p className="mt-2 text-gray-600">
              Masuk untuk melanjutkan petualangan wisatamu.
            </p>
          </div>

          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email-login"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email-login"
                placeholder="kamu@contoh.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password-login"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forget-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <input
                type="password"
                id="password-login"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-3 font-semibold text-white transition-all duration-300 transform rounded-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>
            <div className="mt-4 text-sm text-center text-gray-600">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Daftar di sini
              </Link>
            </div>
          </form>
        </div>

        {/* Gambar */}
        <div className="relative hidden w-full md:w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Pemandangan wisata"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-blue-600 to-purple-600"></div>
        </div>
      </div>
    </main>
  );
}
