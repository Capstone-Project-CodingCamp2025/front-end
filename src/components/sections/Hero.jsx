export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/src/assets/alamsumatera.jpg" 
          alt="Pemandangan Sumatera"
          className="object-cover w-full h-full transition-transform duration-1000 ease-out scale-110 group-hover:scale-100"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="px-6 mx-auto text-center max-w-7xl">
          
          <div className="inline-block px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
            <p className="text-sm font-semibold tracking-widest text-white">EXPLORE SUMATERA</p>
          </div>
          
         
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Ayo Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Wisatamu</span> Sekarang
          </h1>
          
          {/* Deskripsi */}
          <p className="max-w-2xl mx-auto mb-10 text-xl text-white/90">
            Website wisata bertenaga AI yang disesuaikan dengan preferensi unik Anda
          </p>
          
          {/* Tombol CTA */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 px-8 py-3 font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg hover:scale-105">
              Jelajahi Sekarang
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute transform -translate-x-1/2 bottom-10 left-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  );
}