import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alldestination = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/recommendations/popular",
          { params: { limit: 12 } }
        );
        setDestinations(response.data.recos);
      } catch (error) {
        console.error("Failed to fetch popular destinations:", error);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl mb-2">
          Destinasi Populer
        </h1>
        <p className="text-sm md:text-base text-gray-500/90 mb-2 max-w-2xl">
          Tempat wisata dengan rating tertinggi dan ulasan terbanyak
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => {
              navigate(`/destination/${d.id}`);
              scrollTo(0, 0);
            }}
          >
            <div className="h-48 md:h-56 w-full overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-lg">{d.name}</p>
                <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  <span className="mr-1">⭐</span>
                  {d.rating}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{d.location}</p>
              <p className="text-xs text-gray-500 mb-2">
                {d.reviewCount} ulasan
              </p>
              <p className="font-bold text-base text-gray-900">{d.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alldestination;
