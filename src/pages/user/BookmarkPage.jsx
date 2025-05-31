/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="px-4 mb-12 pt-28 md:pt-35 md:px-16 lg:px-24">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-display md:text-4xl">Bookmark Saya</h1>
        <p className="max-w-2xl mb-2 text-sm md:text-base text-gray-500/90">
          Daftar destinasi yang telah Anda simpan
        </p>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">Belum ada destinasi yang di-bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookmarks.map((destination) => (
            <Link
              key={destination.id}
              className="relative flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-lg cursor-pointer rounded-2xl hover:scale-105"
              onClick={() => {navigate(`/destination/${destination.id}`); scrollTo(0,0)}}
            >
              <div className="w-full h-48 overflow-hidden md:h-56">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-bold">{destination.name}</p>
                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                    <span className="mr-1">⭐</span>{destination.rating}
                  </span>
                </div>
                <p className="mb-1 text-xs text-gray-500">{destination.location}</p>
                <p className="text-base font-bold text-gray-900">{destination.price}</p>
              </div>
              {/* Tombol hapus bookmark */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(destination.id);
                }}
                className="absolute p-2 text-white bg-red-500 rounded-full shadow top-3 right-3 hover:bg-red-600"
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