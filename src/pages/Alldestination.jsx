// pages/Alldestination.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alldestination = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recommendations");
        setDestinations(response.data.recos); // ambil array recos dari object
        console.log("Recommendations API response:", response.data.recos);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Rekomendasi Untuk Anda</h1>
        <p className="text-sm md:text-base text-gray-500/90 mb-2 max-w-2xl">
          Destinasi populer pilihan traveler
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => {
              navigate(`/destination/${destination.id}`);
              scrollTo(0, 0);
            }}
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
                  <span className="mr-1">⭐</span>
                  {destination.rating}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{destination.location}</p>
              <p className="font-bold text-base text-gray-900">{destination.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alldestination;
