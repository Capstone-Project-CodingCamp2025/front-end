import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';


const Logo = () => (
  <Link to="/" className="flex items-center flex-shrink-0">
    <svg
      className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-label="SIRESITA Logo"
    >
      <path d="M12 2L4 8v12h16V8L12 2zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
    </svg>
    <span className="ml-2 text-xl font-bold text-white">SIRESITA</span>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); // Gunakan context
  console.log("Navbar: isAuthenticated:", isAuthenticated, "User:", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false); 
  };

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Destinasi', path: '/destination' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Kontak', path: '/contact' }, 
  ];

  const baseLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeLinkClasses = "bg-blue-700 text-white"; 
  const inactiveLinkClasses = "text-blue-100 hover:bg-blue-500 hover:text-white";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated && ( // Tampilkan link Bookmark jika sudah login
              <NavLink
                key="Bookmark"
                to="/bookmark" // Rute ke halaman bookmark
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                Bookmark
              </NavLink>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="items-center hidden ml-4 space-x-2 md:flex"> {/* */}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/user" 
                  className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                >
                  Halo, {user?.name || user?.username || 'Pengguna'}!
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-md hover:bg-blue-700"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-bold text-blue-600 transition-all duration-200 bg-white rounded-md shadow-sm hover:bg-blue-50 hover:scale-105"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden"> {/* */}
             {!isAuthenticated && ( // Tampilkan tombol Masuk jika belum login
                 <Link
                  to="/login"
                  className="px-3 py-2 mr-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Masuk
                </Link>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-blue-100 bg-blue-600 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Buka menu utama</span>
              {!isOpen ? (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0' 
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive ? activeLinkClasses : inactiveLinkClasses}`
              }
              onClick={() => setIsOpen(false)} 
            >
              {link.name}
            </NavLink>
          ))}
          {isAuthenticated && ( // Tampilkan link Bookmark mobile jika sudah login
            <NavLink
                key="Bookmark-mobile"
                to="/bookmark"
                className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
                onClick={() => setIsOpen(false)}
            >
                Bookmark
            </NavLink>
          )}

          {/* Auth Buttons - Mobile */}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/user" 
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
                onClick={() => setIsOpen(false)}
              >
                Halo, {user?.name || user?.username || 'Pengguna'}!
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2 mt-1 text-base font-medium text-left text-blue-100 rounded-md hover:bg-orange-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="block w-full px-3 py-2 mt-2 text-base font-bold text-center text-blue-600 bg-white rounded-md hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Daftar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
