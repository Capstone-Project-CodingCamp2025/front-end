import { Link } from 'react-router-dom';
// Impor gambar dari src/assets (REKOMENDASI jika gambar di src)
import heroImage from '../../assets/alamsumatera.jpg'; 

export default function Hero() {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          
          src={heroImage}
          alt="Pemandangan alam Sumatera yang memukau untuk SIRESITA"
          className="object-cover w-full h-full"
        />
        {/* Overlay Gradien */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent"></div>
      </div>

      {/* Konten Teks dan CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <div className="container px-6 mx-auto max-w-7xl">
          {/* Badge "EXPLORE SUMATERA" */}
          <div className="inline-block px-4 py-2 mb-6 delay-200 border rounded-full opacity-0 bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in-down"> {/* Penyesuaian delay */}
            <p className="text-sm font-semibold tracking-widest text-white">
              EXPLORE SUMATERA
            </p>
          </div>

          {/* Judul Utama */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white opacity-0 md:text-6xl animate-fade-in-down delay-400"> {/* Penyesuaian delay */}
            Ayo Temukan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Wisatamu
            </span>{' '}
            Sekarang
          </h1>

          {/* Deskripsi */}
          <p className="max-w-2xl mx-auto mb-10 text-lg opacity-0 text-white/90 md:text-xl animate-fade-in-up delay-600"> {/* Penyesuaian delay */}
            Website wisata bertenaga AI yang disesuaikan dengan preferensi unik Anda. Temukan permata tersembunyi dan rencanakan perjalanan impian.
          </p>

          {/* Tombol CTA */}
          <div className="opacity-0 animate-fade-in-up delay-800"> 
            <Link
              to={'/destination'}
              onClick={handleScrollToTop}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:scale-105"
            >
              Jelajahi Sekarang
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Indikator Scroll */}
      <div className="absolute delay-1000 transform -translate-x-1/2 opacity-0 bottom-10 left-1/2 animate-bounce animate-fade-in-up"> 
        <svg
          className="w-8 h-8 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}