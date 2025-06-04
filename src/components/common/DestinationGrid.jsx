import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPopularRecommendations } from '../../api/recommendations';

export default function DestinationGrid() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [error, setError] = useState(null); // Tambahkan state error

    const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularRecommendations(); // Panggil fungsi API
        setDestinations(data.recos || data || []); // Sesuaikan dengan struktur respons backend
        console.log("Recommendations API response:", data);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError("Gagal memuat rekomendasi. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-48 text-gray-600">Memuat rekomendasi...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-48 text-red-600">{error}</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Rekomendasi Untuk Anda
            </h2>
            <p className="text-gray-600">Destinasi populer pilihan traveler</p>
          </div>

          {/* tombol lihat semua */}
          <button
            onClick={() => {
              navigate("/destination");
              scrollTo(0, 0);
            }}
            className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
          >
            Lihat Semua
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

          {destinations.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada rekomendasi populer saat ini.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              // Perbaikan di sini: Gunakan Link sebagai elemen interaktif
              <Link
                key={destination.id}
                to={`/destination/${destination.id}`} // Menggunakan to prop dari Link
                onClick={handleScrollToTop} // Pindahkan fungsi scrollTo di sini
                className="relative overflow-hidden transition-shadow duration-300 shadow-lg group rounded-2xl hover:shadow-xl cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Deskripsi */}
                <div className="p-6 text-gray-900">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                      ⭐ {destination.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{destination.location}</p>
                      <p className="font-bold">{destination.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
