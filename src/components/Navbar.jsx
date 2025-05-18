import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L4 8v12h16V8L12 2zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">SIRESITA</span>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-4 md:flex">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-400"
            >
              Beranda
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-400"
            >
              Tentang
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-400"
            >
              Kontak
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="items-center hidden ml-4 space-x-2 md:flex">
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-100"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-bold text-blue-600 bg-white rounded-md shadow-sm hover:bg-blue-50"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button (Pertahankan ukuran asli) */}
          <div className="flex items-center md:hidden">
            <Link
              to="/login"
              className="px-3 py-2 mr-2 text-sm font-medium text-white"
            >
              Masuk
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-blue-400 focus:outline-none"
            >
              {!isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Pertahankan gaya awal) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-600`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Tentang
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Kontak
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 mt-2 text-base font-bold text-center text-blue-600 bg-white rounded-md hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
