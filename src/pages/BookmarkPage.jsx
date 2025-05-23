import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = bookmarks.filter((item) => String(item.id) !== String(id));
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="pt-28 md:pt-35 px-4 md:px-16 lg:px-24 mb-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Bookmark Saya</h1>
        <p className="text-sm md:text-base text-gray-500/90 mb-2 max-w-2xl">
          Daftar destinasi yang telah Anda simpan
        </p>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">Belum ada destinasi yang di-bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookmarks.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 relative"
              onClick={() => {navigate(`/destination/${destination.id}`); scrollTo(0,0)}}
            >
              <div className="h-48 md:h-56 w-full overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-lg">{destination.name}</p>
                  <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    <span className="mr-1">⭐</span>{destination.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{destination.location}</p>
                <p className="font-bold text-base text-gray-900">{destination.price}</p>
              </div>
              {/* Tombol hapus bookmark */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(destination.id);
                }}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow"
                title="Hapus Bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;