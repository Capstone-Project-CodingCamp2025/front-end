/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useBookmarkPresenter } from '../../presenter/useBookmarkPresenter';

const BookmarkPage = () => {
  const {
    bookmarks,
    isLoading,
    handleRemoveBookmark,
    navigateToDestination,
  } = useBookmarkPresenter();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-20rem)] text-gray-600 text-lg">Memuat bookmark...</div>;
  }

return (
    <div className="px-4 py-8 mb-12 md:px-16 lg:px-24"> {/* Sesuaikan padding top jika Navbar fixed */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-2 text-3xl font-display md:text-4xl">Bookmark Saya</h1>
        <p className="max-w-2xl text-sm md:text-base text-gray-500/90">
          Daftar destinasi yang telah Anda simpan untuk dikunjungi nanti.
        </p>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada destinasi yang di-bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookmarks.map((destination) => (
            <Link 
              key={destination.id}
              className="relative flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-lg cursor-pointer rounded-2xl hover:scale-105 group"
              onClick={() => navigateToDestination(destination.id)}
            >
              <div className="w-full h-48 overflow-hidden md:h-56">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-bold truncate">{destination.name}</p>
                  {destination.rating && (
                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                      <span className="mr-1">⭐</span>{destination.rating}
                    </span>
                  )}
                </div>
                <p className="mb-1 text-xs text-gray-500">{destination.location}</p>
                <p className="text-base font-bold text-gray-900">{destination.price}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah navigasi saat menghapus
                  handleRemoveBookmark(destination.id);
                }}
                className="absolute z-10 p-2 text-white transition-colors bg-red-500 rounded-full shadow-md top-3 right-3 hover:bg-red-600"
                title="Hapus Bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;