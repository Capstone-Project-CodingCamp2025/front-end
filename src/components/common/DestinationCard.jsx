// src/components/common/DestinationCard.jsx
export default function DestinationCard({ destination }) {
  return (
    <div className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent p-6 flex flex-col justify-end">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
          <span className="flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            ⭐ {destination.rating}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80 mb-2">{destination.description}</p>
            <p className="text-white font-bold">
              {destination.price}{' '}
              <span className="text-white/70 font-normal">/ night</span>
            </p>
          </div>
          <button className="bg-white text-primary-600 p-3 rounded-full hover:bg-primary-100 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute top-4 right-4 bg-secondary-400 text-dark-900 px-3 py-1 rounded-full text-xs font-bold">
        POPULAR
      </div>
    </div>
  );
}
