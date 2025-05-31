import { Link } from "react-router-dom";
import useIntersectionObserver from '../../Hook/useIntersectionObserver';

export default function LoginCTA() {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  
  const [sectionRef, isSectionVisible] = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true, rootMargin: '0px 0px -30px 0px' });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true, rootMargin: '0px 0px -30px 0px' });
  const [buttonsRef, areButtonsVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true, rootMargin: '0px 0px -30px 0px' });

  // Kelas dasar untuk transisi
  const baseTransitionClasses = "transition-all duration-700 ease-out transform";
  const initialClasses = "opacity-0 translate-y-8"; 
  const visibleClasses = "opacity-100 translate-y-0"; 

  return (
    
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 ${baseTransitionClasses} ${isSectionVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-4xl px-6 mx-auto">
        <div className={`relative p-10 overflow-hidden text-center text-white shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl`}>
          {/* Elemen dekoratif dengan animasi pulse halus */}
          <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 bg-white/10 animate-pulse delay-700 duration-[4000ms]"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 translate-x-1/2 translate-y-1/2 rounded-full opacity-50 bg-white/10 animate-pulse delay-1000 duration-[4000ms]"></div>

          <h2
            ref={titleRef}
            className={`relative z-10 mb-4 text-3xl font-bold ${baseTransitionClasses} ${isTitleVisible ? visibleClasses : initialClasses}`}
          >
            Belum Dapat Referensi Wisata?
          </h2>
          <p
            ref={textRef}
            className={`relative z-10 max-w-2xl mx-auto mb-8 text-lg ${baseTransitionClasses} delay-200 ${isTextVisible ? visibleClasses : initialClasses}`}
          >
            Masuk dan dapatkan rekomendasi personalized berdasarkan preferensi Anda
          </p>

          <div
            ref={buttonsRef}
            className={`relative z-10 flex flex-col justify-center gap-4 sm:flex-row ${baseTransitionClasses} delay-300 ${areButtonsVisible ? visibleClasses : initialClasses}`}
          >
            <Link
              to="/register"
              onClick={handleScrollToTop}
              className="px-8 py-3 font-bold text-blue-600 transition-all duration-300 bg-white rounded-full hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
            >
              Daftar Gratis
            </Link>
            <Link
              to="/login"
              onClick={handleScrollToTop}
              className="flex items-center justify-center gap-2 px-8 py-3 font-medium text-white transition-all duration-300 bg-transparent border-2 border-white rounded-full hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}