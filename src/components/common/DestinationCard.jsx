export default function DestinationCard({ destination }) {
  return (
    <div className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
      <img
        src={destination.image}
        alt={destination.name}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
          <span className="flex items-center px-3 py-1 text-sm text-white rounded-full bg-white/20 backdrop-blur-sm">
            ⭐ {destination.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-white/80">{destination.description}</p>
            <p className="font-bold text-white">
              {destination.price}{' '}
              <span className="font-normal text-white/70">/ night</span>
            </p>
          </div>
          <button className="p-3 transition-colors bg-white rounded-full text-primary-600 hover:bg-primary-100">
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
      <div className="absolute px-3 py-1 text-xs font-bold rounded-full top-4 right-4 bg-secondary-400 text-dark-900">
        POPULAR
      </div>
    </div>
  );
}
