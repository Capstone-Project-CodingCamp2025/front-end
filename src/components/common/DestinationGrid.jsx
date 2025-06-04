import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DestinationGrid() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recommendations/popular"); 
        setDestinations(response.data.destinations);
        console.log("Recommendations API response:", response.data.destinations);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="relative overflow-hidden transition-shadow duration-300 shadow-lg group rounded-2xl hover:shadow-xl cursor-pointer"
              onClick={() => {
                navigate(`/destination/${destination.id}`);
                scrollTo(0, 0);
              }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
