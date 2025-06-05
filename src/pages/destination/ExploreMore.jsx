import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useIntersectionObserver from '../../Hook/useIntersectionObserver'; 
import { getAllPlaces } from '../../api/place';
import { useAllDestinationPresenter } from '../../presenter/useAllDestinationPresenter'; // Import presenter jika diperlukan

const AnimatedDestinationCard = ({ destination, index, onCardClick }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  // Delay animasi berdasarkan index kartu
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
        onClick={onCardClick} // Menggunakan prop untuk onClick
        className="block overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{destination.name}</h3>
            {destination.rating && (
              <span className="flex items-center px-2.5 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                ⭐ {destination.rating}
              </span>
            )}
          </div>
          {destination.location && (
            <p className="mb-2 text-sm text-gray-500">{destination.location}</p>
          )}
          {destination.price && (
            <p className="text-base font-bold text-blue-600">{destination.price}</p>
          )}
        </div>
      </Link>
    </div>
  );
};


export default function Alldestination() {
  // Presenter untuk mendapatkan state dan logika
  const { destinations, isLoading, error } = useAllDestinationPresenter();

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true }); //
  const baseTransitionClasses = "transition-all duration-700 ease-out transform";
  const initialClasses = "opacity-0 translate-y-8";
  const visibleClasses = "opacity-100 translate-y-0";

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-gray-600 text-lg">Memuat destinasi...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-red-600 text-lg">{error}</div>;
  }

  return (
    <section className="py-12 bg-slate-50 md:pt-0"> {/* pt-0 di md jika navbar fixed */}
      <div className="container px-6 mx-auto lg:px-8">
        <div
          ref={titleRef}
          className={`mb-12 text-center pt-10 ${baseTransitionClasses} ${isTitleVisible ? visibleClasses : initialClasses}`}
        >
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Explore More</h1>
          <p className="mt-2 text-lg text-gray-600">Destinasi lainnya yang mungkin Anda suka</p>
        </div>

        {destinations.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">Tidak ada destinasi yang tersedia saat ini.</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination, index) => (
            <AnimatedDestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              onCardClick={handleScrollToTop} // Mengirim fungsi untuk onClick
            />
          ))}
        </div>
      </div>
    </section>
  );
}
