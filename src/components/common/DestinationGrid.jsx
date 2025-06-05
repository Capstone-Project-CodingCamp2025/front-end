import { Link } from 'react-router-dom';
import { useDestinationGridPresenter } from '../../presenter/useDestinationGridPresenter';

export default function DestinationGrid() {
  const {
    destinations,
    isLoading,
    error,
    navigateToAllDestinations,
    navigateToDestinationDetail,
  } = useDestinationGridPresenter();

  if (isLoading) {
    return <div className="flex justify-center items-center h-48 text-gray-600">Memuat rekomendasi...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-48 text-red-600">{error}</div>;
  }

  // Ambil 7 destinasi pertama untuk ditampilkan di slider
  const displayedDestinations = destinations.slice(0, 7);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center md:mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Rekomendasi Untuk Anda</h2>
            <p className="mt-1 text-sm text-gray-600 md:text-base">Destinasi populer pilihan traveler</p>
          </div>
          <button
            onClick={navigateToAllDestinations}
            className="flex items-center gap-2 mt-4 font-medium text-blue-600 md:mt-0 hover:text-blue-800"
          >
            Lihat Semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {destinations.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada rekomendasi populer saat ini.</p>
        ) : (
          // SLIDER HORIZONTAL
          <div className="flex pb-4 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 scrollbar-hide">
            <div className="flex flex-nowrap px-4 space-x-6 sm:px-6 lg:px-8">
              {/* Tampilkan 7 kartu destinasi */}
              {displayedDestinations.map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => navigateToDestinationDetail(destination.id)}
                  className="relative flex-shrink-0 w-64 overflow-hidden transition-shadow duration-300 shadow-lg cursor-pointer sm:w-72 group rounded-2xl hover:shadow-xl"
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateToDestinationDetail(destination.id);
                    }
                  }}
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={destination.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold truncate">{destination.name}</h3>
                      {destination.rating && (
                        <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                          ⭐ {destination.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{destination.location}</p>
                      {destination.price && (
                        <p className="mt-1 font-bold text-gray-900">{destination.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/*  "Lihat Semua" di akhir slider */}
              {destinations.length > 7 && ( 
                <Link
                  to="/destination"
                  className="flex flex-col items-center justify-center flex-shrink-0 w-64 p-5 text-center transition-all duration-300 bg-white border-2 border-dashed sm:w-72 rounded-2xl hover:border-blue-500 hover:bg-blue-50"
                >
                  <div className="p-4 mb-4 bg-blue-100 rounded-full">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Lihat Semua
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Jelajahi lebih banyak destinasi
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
