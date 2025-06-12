// src/components/Register.jsx - Updated with animations like Login.jsx
import { Link } from 'react-router-dom';
import { useRegisterPresenter } from '../../presenter/useRegisterPresenter';
import GoogleRegister from '../../components/GoogleRegister';
import useIntersectionObserver from '../../Hook/useIntersectionObserver';

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

  // Intersection Observer hooks untuk animasi
  const [containerRef, isContainerVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [backButtonRef, isBackButtonVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formRef, isFormVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [imageRef, isImageVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister();
  };

  // Animation classes
  const baseTransition = 'transition-all duration-700 ease-out';
  const initialStyle = 'opacity-0 translate-y-10';
  const visibleStyle = 'opacity-100 translate-y-0';
  const scaleInitial = 'opacity-0 scale-95';
  const scaleVisible = 'opacity-100 scale-100';

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div 
        ref={containerRef}
        className={`flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl ${baseTransition} ${
          isContainerVisible ? scaleVisible : scaleInitial
        }`}
      >
        {/* Gambar dengan animasi */}
        <div 
          ref={imageRef}
          className={`relative hidden w-full md:w-1/2 md:block ${baseTransition} delay-400 ${
            isImageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1653992145035-718b18fab561?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Inspirasi perjalanan untuk akun baru"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-blue-600 to-purple-600"></div>
        </div>

        <div className="flex flex-col justify-center w-full p-8 md:w-1/2 lg:p-12">
          {/* Tombol kembali dengan animasi */}
          <div 
            ref={backButtonRef}
            className={`mb-6 md:mb-8 ${baseTransition} delay-100 ${
              isBackButtonVisible ? visibleStyle : initialStyle
            }`}
          >
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

          {/* Header dengan animasi */}
          <div 
            ref={headerRef}
            className={`mb-8 text-center md:text-left ${baseTransition} delay-200 ${
              isHeaderVisible ? visibleStyle : initialStyle
            }`}
          >
            <Link 
              to="/" 
              className={`inline-block mb-6 text-2xl font-bold text-blue-600 ${baseTransition} delay-300 ${
                isHeaderVisible ? visibleStyle : initialStyle
              }`}
            >
              SIRESITA
            </Link>
            <h1 
              className={`text-3xl font-bold text-gray-800 md:text-4xl ${baseTransition} delay-400 ${
                isHeaderVisible ? visibleStyle : initialStyle
              }`}
            >
              Buat Akun Baru
            </h1>
            <p 
              className={`mt-2 text-gray-600 ${baseTransition} delay-500 ${
                isHeaderVisible ? visibleStyle : initialStyle
              }`}
            >
              Daftar dan mulai rencanakan perjalanan impianmu.
            </p>
          </div>

          {/* Form dengan animasi */}
          <form 
            ref={formRef}
            className={`flex flex-col gap-y-5 ${baseTransition} delay-300 ${
              isFormVisible ? visibleStyle : initialStyle
            }`} 
            onSubmit={handleSubmit}
          >
            <div 
              className={`${baseTransition} delay-400 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>

            <div 
              className={`${baseTransition} delay-500 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isGoogleLoading}
              />
            </div>

            <div 
              className={`${baseTransition} delay-600 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
              } focus:outline-none focus:ring-2 focus:ring-blue-500 ${baseTransition} delay-700 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
              {isLoading ? 'Sedang Daftar...' : isGoogleLoading ? 'Memproses...' : 'Register'}
            </button>

            {/* Divider dengan animasi */}
            <div 
              className={`relative ${baseTransition} delay-800 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau daftar dengan google</span>
              </div>
            </div>

            {/* Google Register Button dengan animasi */}
            <div 
              className={`${baseTransition} delay-900 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
              <GoogleRegister onLoading={setIsGoogleLoading} />
            </div>

            <div 
              className={`mt-4 text-sm text-center text-gray-600 ${baseTransition} delay-1000 ${
                isFormVisible ? visibleStyle : initialStyle
              }`}
            >
              Sudah punya akun?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline transition-colors duration-200"
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