/* eslint-disable no-unused-vars */
import { useBookmarkPresenter } from '../../presenter/useBookmarkPresenter';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../Hook/useIntersectionObserver';

const BookmarkPage = () => {
  const navigate = useNavigate();
  const {
    bookmarks,
    isLoading,
    handleRemoveBookmark,
    navigateToDestination, 
  } = useBookmarkPresenter();

  // Intersection Observer hooks untuk animasi
  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [emptyStateRef, isEmptyStateVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [countRef, isCountVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [gridRef, isGridVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animation classes
  const baseTransition = 'transition-all duration-700 ease-out';
  const initialStyle = 'opacity-0 translate-y-10';
  const visibleStyle = 'opacity-100 translate-y-0';
  const scaleInitial = 'opacity-0 scale-95';
  const scaleVisible = 'opacity-100 scale-100';
  const fadeInitial = 'opacity-0';
  const fadeVisible = 'opacity-100';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 animate-pulse">Memuat bookmark...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section dengan animasi */}
      <div 
        ref={headerRef}
        className={`text-center mb-8 ${baseTransition} ${
          isHeaderVisible ? visibleStyle : initialStyle
        }`}
      >
        <div 
          className={`flex items-center justify-center mb-4 ${baseTransition} delay-100 ${
            isHeaderVisible ? visibleStyle : initialStyle
          }`}
        >
          <svg 
            className="w-8 h-8 text-yellow-500 mr-3 transition-transform duration-300 hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
          </svg>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Bookmark Saya
          </h1>
        </div>
        <p 
          className={`text-gray-600 text-lg max-w-2xl mx-auto ${baseTransition} delay-200 ${
            isHeaderVisible ? visibleStyle : initialStyle
          }`}
        >
          Daftar destinasi yang telah Anda simpan untuk dikunjungi nanti.
        </p>
      </div>

      {/* Content Section */}
      {bookmarks.length === 0 ? (
        <div 
          ref={emptyStateRef}
          className={`text-center py-16 ${baseTransition} delay-300 ${
            isEmptyStateVisible ? scaleVisible : scaleInitial
          }`}
        >
          <div className="max-w-md mx-auto">
            <div 
              className={`${baseTransition} delay-400 ${
                isEmptyStateVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <svg 
                className="w-24 h-24 text-gray-300 mx-auto mb-6 transition-transform duration-500 hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" 
                />
              </svg>
            </div>
            <h3 
              className={`text-xl font-semibold text-gray-600 mb-2 ${baseTransition} delay-500 ${
                isEmptyStateVisible ? visibleStyle : initialStyle
              }`}
            >
              Belum ada destinasi yang di-bookmark
            </h3>
            <p 
              className={`text-gray-500 mb-6 ${baseTransition} delay-600 ${
                isEmptyStateVisible ? visibleStyle : initialStyle
              }`}
            >
              Mulai jelajahi destinasi wisata dan simpan yang menarik untuk Anda!
            </p>
            <button
              onClick={() => navigate('/destination')}
              className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${baseTransition} delay-700 ${
                isEmptyStateVisible ? visibleStyle : initialStyle
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Jelajahi Destinasi
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bookmark Count dengan animasi */}
          <div 
            ref={countRef}
            className={`flex items-center justify-between mb-6 ${baseTransition} delay-300 ${
              isCountVisible ? visibleStyle : initialStyle
            }`}
          >
            <p 
              className={`text-gray-600 ${baseTransition} delay-400 ${
                isCountVisible ? visibleStyle : initialStyle
              }`}
            >
              <span className="font-semibold text-blue-600 transition-colors duration-300">
                {bookmarks.length}
              </span> destinasi tersimpan
            </p>
            <div 
              className={`flex items-center space-x-2 text-sm text-gray-500 ${baseTransition} delay-500 ${
                isCountVisible ? visibleStyle : initialStyle
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Klik pada kartu untuk melihat detail</span>
            </div>
          </div>

          {/* Bookmarks Grid dengan animasi */}
          <div 
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${baseTransition} delay-400 ${
              isGridVisible ? fadeVisible : fadeInitial
            }`}
          >
            {bookmarks.map((destination, index) => {
              // FIXED: Better ID handling with multiple fallbacks
              const destinationId = destination.id || 
                                   destination.place_id || 
                                   destination.bookmark_id;
              
              // FIXED: Better field mapping
              const destinationName = destination.name || 
                                     destination.nama_tempat || 
                                     'Nama tidak tersedia';
              const destinationImage = destination.image || 
                                      destination.gambar || 
                                      '/api/placeholder/400/300';
              const destinationLocation = destination.location || 
                                        destination.alamat || 
                                        'Lokasi tidak tersedia';
              const rawRating = destination.rating;
              const destinationRating = 
                rawRating !== null && rawRating !== undefined && !isNaN(rawRating)
                  ? parseFloat(rawRating).toFixed(1)
                  : null;
              const destinationCategory = destination.kategori || 
                                        destination.category || null;

              // FIXED: Skip if no valid ID
              if (!destinationId) {
                console.warn('⚠️ Skipping bookmark with no valid ID:', destination);
                return null;
              }

              return (
                <div
                  key={`bookmark-${destinationId}`}
                  className={`relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${baseTransition} ${
                    isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    animationDelay: `${(index * 100) + 500}ms`,
                    animationDuration: '700ms',
                    animationFillMode: 'both'
                  }}
                >
                  {/* Image Section */}
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => navigateToDestination(destinationId)}
                    role="button" 
                    tabIndex={0} 
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigateToDestination(destinationId);
                      }
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={destinationImage}
                        alt={destinationName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => navigateToDestination(destinationId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigateToDestination(destinationId);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-2 transition-colors duration-300 group-hover:text-blue-600">
                        {destinationName}
                      </h3>
                      {destinationRating && (
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full shrink-0 transition-all duration-300 hover:bg-yellow-200">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                          </svg>
                          <span className="text-sm font-semibold text-yellow-700">
                            {destinationRating}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                        <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm line-clamp-1">
                          {destinationLocation}
                        </span>
                      </div>

                      {destinationCategory && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 shrink-0 text-blue-500 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="text-sm text-blue-600 font-medium transition-colors duration-300 group-hover:text-blue-700">
                            {destinationCategory}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // FIXED: Use the correct ID for removal
                      const removeId = destination.place_id || destination.id || destination.bookmark_id;
                      handleRemoveBookmark(removeId);
                    }}
                    className="absolute z-10 p-2 text-white transition-all duration-300 bg-red-500 rounded-full shadow-lg top-3 right-3 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transform opacity-80 hover:opacity-100"
                    title="Hapus Bookmark"
                    aria-label="Hapus dari bookmark"
                  >
                    <svg className="w-5 h-5 transition-transform duration-200 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;