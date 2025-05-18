export default function DestinationGrid() {
  const destinations = [
  //  {
  //   id: 1,
  //   name: 'Danau Toba',
  //   image: 'https://images.unsplash.com/photo-1582972236019-ea9e36d7f32e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //   rating: 4.8,
  //   location: 'Sumatera Utara',
  //   price: 'Rp 1.2jt',
  // },
  {
    id: 2,
    name: 'Pulau Samosir',
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    location: 'Sumatera Utara',
    price: 'Rp 1.5jt',
  },
  {
    id: 3,
    name: 'Bukit Lawang',
    image: 'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    location: 'Sumatera Utara',
    price: 'Rp 800rb',
  },
  // {
  //   id: 4,
  //   name: 'Air Terjun Sipiso-piso',
  //   image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //   rating: 4.9,
  //   location: 'Sumatera Utara',
  //   price: 'Rp 600rb',
  // },
  {
    id: 5,
    name: 'Jam Gadang',
    image: 'https://images.unsplash.com/photo-1619983081563-430f6c6d058a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    location: 'Bukittinggi, Sumatera Barat',
    price: 'Rp 500rb',
  },
  {
    id: 6,
    name: 'Lembah Harau',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    location: 'Sumatera Barat',
    price: 'Rp 750rb',
  },
];

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
          <button className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800">
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
              className="relative overflow-hidden transition-shadow duration-300 shadow-lg group rounded-2xl hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <span className="flex items-center px-2 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                    ⭐ {destination.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{destination.location}</p>
                    <p className="font-bold">{destination.price}</p>
                  </div>
                  <button className="p-2 text-blue-600 bg-white rounded-full hover:bg-blue-50">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
