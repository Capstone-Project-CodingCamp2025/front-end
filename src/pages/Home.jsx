/* eslint-disable no-unused-vars */
// import Footer from '../components/Footer.jsx';
// import Navbar from '../components/Navbar.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DestinationGrid from '../components/common/DestinationGrid.jsx';
import Hero from '../components/sections/Hero.jsx';
import LoginCTA from '../components/sections/LoginCTA.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />; 
  }
  if (isAuthenticated) {
    return <Navigate to="/user" replace />;
  }

  // Jika pengguna belum login, tampilkan konten halaman Home publik

  return (
    // <div className="flex flex-col min-h-screen">
    //   <Navbar />
      <main className="flex-grow">
        <Hero />
        <DestinationGrid />
        <LoginCTA />
      </main>
    //   <Footer />
    // </div>
  );
}
