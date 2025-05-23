export default function Footer() {
  return (
    <footer className="py-12 text-white bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">

          <div>
            <div className="flex items-center mb-4">
              <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L4 8v12h16V8L12 2zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
            </svg>
              <span className="ml-2 text-lg sm:text-xl font-bold">SIRESITA</span>
            </div>
            <p className="text-white mb-6 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum consectetur, blanditiis nesciunt ea maxime autem! Quo, necessitatibus cumque. Optio laboriosam laudantium a debitis dicta. Labore tenetur debitis vel nihil?
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 border-b border-white pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">Home</a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">About Us</a>
              </li>
              <li>
                <a href="/destination" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">Destinations</a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 border-b border-white pb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">Travel Planning</a>
              </li>
              <li>
                <a href="destination" className="text-white hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">Recommend Destination</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 border-b border-white pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <button className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-3 mt-1" />
                <span className="text-white text-sm sm:text-base">Sumatera Utara</span>
              </li>
              <li className="flex items-center">
                <button className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-3" />
                <span className="text-white text-sm sm:text-base">+62 (666) 123-4567</span>
              </li>
              <li className="flex items-center">
                <button className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-3" />
                <span className="text-white text-sm sm:text-base">info@siresita.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <p className="text-white text-xs sm:text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} SIRESITA. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-white hover:text-blue-400 text-xs sm:text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-blue-400 text-xs sm:text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-blue-400 text-xs sm:text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};