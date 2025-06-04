// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// import AuthLayout from './components/layout/AuthLayout'; 
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingScreen from './components/common/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Alldestination from './pages/destination/Alldestination';
import DestinationDetail from './pages/destination/DestinationDetail';
import Login from './pages/Auth/login';
import Register from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/forget/ForgetPassword';
import OtpReset from './pages/Auth/forget/OtpReset';
import NewPassword from './pages/Auth/forget/NewPassword';
import UserPage from './pages/user/UserPage';
import BookmarkPage from './pages/user/BookmarkPage';
import ExploreMore from './pages/destination/ExploreMore';
import Contact from './pages/Contact';
// import NotFoundPage from './pages/NotFoundPage'; // Jika Ada halaman 404


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Padding top seukuran tinggi Navbar jika Navbar fixed (h-16) */}
        <Outlet /> {/* Konten halaman akan dirender di sini */}
      </main>
      <Footer />
    </div>
  );
};

// Komponen AuthLayout (tanpa Navbar & Footer global, atau dengan versi minimal)
// Buat file ini: src/components/layout/AuthLayout.jsx
const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Anda bisa menambahkan logo SIRESITA di sini jika mau */}
      <Outlet />
    </div>
  );
};


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Durasi loading screen
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <Routes>
        {/* Rute yang menggunakan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destination" element={<Alldestination />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/explore-more" element={<ExploreMore />} />
          <Route path="/contact" element={<Contact />} />
          {/* Tambahkan rute lain yang butuh MainLayout di sini */}
        </Route>

        {/* Rute yang menggunakan AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-reset" element={<OtpReset />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
