// src/components/AllDestination.jsx - Enhanced with Search & Filters
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
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
          {/* Rating badge */}
          {destination.rating && (
            <div className="absolute top-2 right-2 z-10">
              <span className="flex items-center px-2 py-1 text-xs font-semibold text-yellow-800 bg-white/90 backdrop-blur-sm rounded-full">
                ⭐ {destination.rating}
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
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 mr-2">
              {destination.name || destination.nama_tempat}
            </h3>
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

            {/* Review count */}
            {destination.jumlah_ulasan && (
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">
                  {destination.jumlah_ulasan} ulasan
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const SearchAndFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  minRating, 
  setMinRating, 
  sortBy, 
  setSortBy,
  categories,
  resultCount 
}) => {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari destinasi wisata..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating Minimum
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Semua Rating</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.0">4.0+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
            <option value="3.0">3.0+ ⭐</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urutkan
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="default">Default</option>
            <option value="name">Nama A-Z</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="reviews">Paling Banyak Ulasan</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">
            Clear
          </label>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setMinRating('');
              setSortBy('default');
            }}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Result Count */}
      {(searchTerm || selectedCategory || minRating) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Menampilkan {resultCount} destinasi
            {searchTerm && ` untuk "${searchTerm}"`}
            {selectedCategory && ` dalam kategori "${selectedCategory}"`}
            {minRating && ` dengan rating minimal ${minRating}`}
          </p>
        </div>
      )}
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
  
  // Hybrid recommendation state
  const [hybridRecommendations, setHybridRecommendations] = useState([]);
  const [hybridLoading, setHybridLoading] = useState(false);
  const [hybridError, setHybridError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Search and Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Intersection observers for animations
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true });

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const categories = useMemo(() => {
    const allCategories = destinations
      .map(dest => dest.kategori || dest.category)
      .filter(Boolean);
    return [...new Set(allCategories)].sort();
  }, [destinations]);

  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = destinations.filter(destination => {
      const name = (destination.name || destination.nama_tempat || '').toLowerCase();
      const description = (destination.deskripsi || destination.description || '').toLowerCase();
      const category = destination.kategori || destination.category || '';
      const rating = parseFloat(destination.rating || 0);

      const matchesSearch = searchTerm === '' || 
        name.includes(searchTerm.toLowerCase()) || 
        description.includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === '' || category === selectedCategory;

      const matchesRating = minRating === '' || rating >= parseFloat(minRating);

      return matchesSearch && matchesCategory && matchesRating;
    });

    // Sort destinations
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => {
          const nameA = (a.name || a.nama_tempat || '').toLowerCase();
          const nameB = (b.name || b.nama_tempat || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
      case 'rating':
        filtered.sort((a, b) => {
          const ratingA = parseFloat(a.rating || 0);
          const ratingB = parseFloat(b.rating || 0);
          return ratingB - ratingA;
        });
        break;
      case 'reviews':
        filtered.sort((a, b) => {
          const reviewsA = parseInt(a.jumlah_ulasan || 0);
          const reviewsB = parseInt(b.jumlah_ulasan || 0);
          return reviewsB - reviewsA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [destinations, searchTerm, selectedCategory, minRating, sortBy]);

  // Filter hybrid recommendations (basic search only for recommendations)
  const filteredHybridRecommendations = useMemo(() => {
    if (!searchTerm) return hybridRecommendations;
    
    return hybridRecommendations.filter(destination => {
      const name = (destination.name || destination.nama_tempat || '').toLowerCase();
      const description = (destination.deskripsi || destination.description || '').toLowerCase();
      return name.includes(searchTerm.toLowerCase()) || 
             description.includes(searchTerm.toLowerCase());
    });
  }, [hybridRecommendations, searchTerm]);

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
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <span>Memuat destinasi...</span>
        </div>
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

        {/* Search and Filter Bar - Show only on "all" tab */}
        {activeTab === 'all' && (
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            resultCount={filteredAndSortedDestinations.length}
          />
        )}

        {/* Simple Search for Recommendations Tab */}
        {activeTab === 'recommended' && showRecommendations && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari dalam rekomendasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {/* Hybrid Recommendations Section */}
        {showRecommendations && activeTab === 'recommended' && (
          <div>
            {hybridLoading && (
              <div className="flex items-center justify-center py-12 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
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

            {!hybridLoading && !hybridError && filteredHybridRecommendations.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredHybridRecommendations.map((destination, index) => (
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

            {!hybridLoading && !hybridError && filteredHybridRecommendations.length === 0 && hybridRecommendations.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Tidak ada rekomendasi yang sesuai dengan pencarian "{searchTerm}".
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Tampilkan semua rekomendasi
                </button>
              </div>
            )}

            {!hybridLoading && !hybridError && hybridRecommendations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 016 0zm-7-4a1 1 0 11-2 0 1 1 0 016 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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
            {filteredAndSortedDestinations.length === 0 && !isLoading && (
              <div className="text-center py-12">
                {searchTerm || selectedCategory || minRating ? (
                  <div>
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-4">Tidak ada destinasi yang sesuai dengan filter yang dipilih.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setMinRating('');
                        setSortBy('default');
                      }}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Reset semua filter
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Tidak ada destinasi yang tersedia saat ini.</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedDestinations.map((destination, index) => (
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
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 016 0zm-6-3a2 2 0 11-4 0 2 2 0 614 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
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