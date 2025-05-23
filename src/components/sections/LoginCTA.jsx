import { Link } from "react-router-dom";

export default function LoginCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl px-6 mx-auto">
        <div className="relative p-10 overflow-hidden text-center text-white shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-white/10"></div>

          <h2 className="relative z-10 mb-4 text-3xl font-bold">
            Belum Dapat Referensi Wisata?
          </h2>
          <p className="relative z-10 max-w-2xl mx-auto mb-8 text-lg">
            Masuk dan dapatkan rekomendasi personalized berdasarkan preferensi
            Anda
          </p>

          <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/register" onClick={() =>scrollTo(0,0)}
            className="px-8 py-3 font-bold text-blue-600 transition-all duration-300 bg-white rounded-full hover:bg-gray-100 hover:scale-105">
              Daftar Gratis
            </Link>
            <Link to={"/login"} onClick={() =>scrollTo(0,0)}
             className="flex items-center justify-center gap-2 px-8 py-3 font-medium text-white transition-colors bg-transparent border-2 border-white rounded-full hover:bg-white/10">
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
