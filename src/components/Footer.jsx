export default function Footer() {
  return (
    <footer className="py-12 text-white bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Konten utama footer */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo/Nama Brand */}
          <div className="flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L4 8v12h16V8L12 2zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
            </svg>
            <span className="text-2xl font-bold">SIRESITA</span>
          </div>

          {/* Tagline */}
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100 md:text-xl">
            Teman perjalanan Anda yang sempurna didukung oleh AI.
          </p>

          {/* Garis pemisah */}
          <div className="w-24 h-0.5 bg-blue-300 mb-8"></div>

          {/* Copyright */}
          <div className="text-sm text-blue-100">
            Copyright © 2025 SIRESITA Sumatera Utara Edition - All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
