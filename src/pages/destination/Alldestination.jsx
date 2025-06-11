// src/components/AllDestination.jsx - Enhanced with Hybrid Recommendations
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useIntersectionObserver from '../../Hook/useIntersectionObserver'; 
import { getAllPlaces } from '../../api/place';
import { getRecommendations } from '../../api/recommendations';
import { useAllDestinationPresenter } from '../../presenter/useAllDestinationPresenter';

const AnimatedDestinationCard = ({ destination, index, onCardClick, isRecommended }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const animationDelay = isCardVisible ? `${index * 100}ms` : '0ms';
  const baseTransitionClasses = "transition-all duration-500 ease-out transform";
  const initialClasses = "opacity-0 translate-y-10";
  const visibleClasses = "opacity-100 translate-y-0";

  return (
    <div
      ref={cardRef}
      className={`${baseTransitionClasses} ${isCardVisible ? visibleClasses : initialClasses}`}
      style={{ transitionDelay: animationDelay }}
    >
      <Link
        to={`/destination/${destination.id}`}
        onClick={onCardClick}
        className="block overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <div className="relative w-full h-56 overflow-hidden">
          {/* Recommended badge */}
          {isRecommended && (
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                ✨ Direkomendasikan
              </span>
            </div>
          )}
          <img
            src={destination.gambar || destination.thumbnail || destination.image}
            alt={destination.name || destination.nama_tempat}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{destination.name || destination.nama_tempat}</h3>
            {destination.rating && (
              <span className="flex items-center px-2.5 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                ⭐ {destination.rating}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm line-clamp-1">
                {destination.location || destination.alamat}
              </span>
            </div>

            {destination.kategori || destination.category && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm text-blue-600 font-medium">
                  {destination.kategori || destination.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, isVisible }) => {
  const baseTransitionClasses = "transition-all duration-700 ease-out transform";
  const initialClasses = "opacity-0 translate-y-8";
  const visibleClasses = "opacity-100 translate-y-0";

  return (
    <div className={`mb-8 text-center ${baseTransitionClasses} ${isVisible ? visibleClasses : initialClasses}`}>
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
      <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
    </div>
  );
};

export default function AllDestination() {
  // Original functionality
  const { destinations, isLoading, error } = useAllDestinationPresenter();
  
  // New hybrid recommendation state
  const [hybridRecommendations, setHybridRecommendations] = useState([]);
  const [hybridLoading, setHybridLoading] = useState(false);
  const [hybridError, setHybridError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'recommended'

  // Intersection observers for animations
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true });
  const [recTitleRef, isRecTitleVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true });

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Load hybrid recommendations
  const loadHybridRecommendations = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No token found, skipping hybrid recommendations');
      return;
    }

    setHybridLoading(true);
    setHybridError(null);

    try {
      console.log('🔄 Loading hybrid recommendations...');
      const recommendations = await getRecommendations();
      console.log('✅ Hybrid recommendations loaded:', recommendations?.length || 0);
      
      if (recommendations && recommendations.length > 0) {
        setHybridRecommendations(recommendations);
        setShowRecommendations(true);
      } else {
        console.log('No hybrid recommendations available');
        setShowRecommendations(false);
      }
    } catch (err) {
      console.error('❌ Error loading hybrid recommendations:', err);
      setHybridError('Gagal memuat rekomendasi personal');
      setShowRecommendations(false);
    } finally {
      setHybridLoading(false);
    }
  };

  // Load hybrid recommendations on component mount
  useEffect(() => {
    loadHybridRecommendations();
  }, []);

  const baseTransitionClasses = "transition-all duration-700 ease-out transform";
  const initialClasses = "opacity-0 translate-y-8";
  const visibleClasses = "opacity-100 translate-y-0";

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-gray-600 text-lg">
        Memuat destinasi...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50 md:pt-0">
      <div className="container px-6 mx-auto lg:px-8">
        {/* Main Title */}
        <div
          ref={titleRef}
          className={`mb-12 text-center pt-10 ${baseTransitionClasses} ${isTitleVisible ? visibleClasses : initialClasses}`}
        >
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Semua Destinasi</h1>
          <p className="mt-2 text-lg text-gray-600">Jelajahi berbagai pilihan wisata menarik di Sumatera.</p>
        </div>

        {/* Tab Navigation - Show only if recommendations are available */}
        {showRecommendations && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Semua Destinasi
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'recommended'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                ✨ Rekomendasi Untukmu
              </button>
            </div>
          </div>
        )}

        {/* Hybrid Recommendations Section */}
        {showRecommendations && activeTab === 'recommended' && (
          <div>
            {hybridLoading && (
              <div className="flex items-center justify-center py-12 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>Memuat rekomendasi personal...</span>
                </div>
              </div>
            )}

            {hybridError && (
              <div className="p-4 mb-8 text-red-700 bg-red-100 rounded-lg">
                {hybridError}
                <button
                  onClick={loadHybridRecommendations}
                  className="ml-4 text-red-800 underline hover:no-underline"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {!hybridLoading && !hybridError && hybridRecommendations.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {hybridRecommendations.map((destination, index) => (
                  <AnimatedDestinationCard
                    key={`rec-${destination.id}`}
                    destination={destination}
                    index={index}
                    onCardClick={handleScrollToTop}
                    isRecommended={true}
                  />
                ))}
              </div>
            )}

            {!hybridLoading && !hybridError && hybridRecommendations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">
                  Belum ada rekomendasi personal tersedia.
                </p>
                <p className="text-sm text-gray-400">
                  Berikan rating pada beberapa tempat untuk mendapatkan rekomendasi yang sesuai dengan preferensimu.
                </p>
              </div>
            )}
          </div>
        )}

        {/* All Destinations Section */}
        {activeTab === 'all' && (
          <div>
            {destinations.length === 0 && !isLoading && (
              <p className="text-center text-gray-500">Tidak ada destinasi yang tersedia saat ini.</p>
            )}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((destination, index) => (
                <AnimatedDestinationCard
                  key={`all-${destination.id}`}
                  destination={destination}
                  index={index}
                  onCardClick={handleScrollToTop}
                  isRecommended={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Info Section for Logged Out Users */}
        {!showRecommendations && !hybridLoading && (
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="text-center">
              <div className="text-blue-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dapatkan Rekomendasi Personal
              </h3>
              <p className="text-gray-600 mb-4">
                Login dan berikan rating pada tempat-tempat favoritmu untuk mendapatkan rekomendasi yang sesuai dengan selera traveling kamu.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Mulai Rating Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}