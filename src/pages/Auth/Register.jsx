import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registrasi gagal');
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
        <div className="relative hidden w-full md:w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1653992145035-718b18fab561?q=80&w=1000&auto=format&fit=crop"
            alt="Inspirasi perjalanan untuk akun baru"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-blue-600 to-purple-600"></div>
        </div>

        <div className="flex flex-col justify-center w-full p-8 md:w-1/2 lg:p-12">
          <div className="mb-6 md:mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-block mb-6 text-2xl font-bold text-blue-600">SIRESITA</Link>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Buat Akun Baru</h1>
            <p className="mt-2 text-gray-600">Daftar dan mulai rencanakan perjalanan impianmu.</p>
          </div>

          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username-register" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username-register"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username_unik"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email-register" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email-register"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@contoh.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password-register" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password-register"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-3 font-semibold text-white rounded-lg transition-all duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {loading ? 'Memproses...' : 'Register'}
            </button>
            <div className="mt-4 text-sm text-center text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                Login di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
