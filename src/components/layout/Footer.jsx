
import { Link } from 'react-router-dom';


const LocationIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const EmailIcon = () => (
  <svg className="flex-shrink-0 w-5 h-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const SiresitaLogo = () => ( 
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-label="SIRESITA Logo">
    <path d="M12 2L4 8v12h16V8L12 2zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
  </svg>
);

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destination' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const resourceLinks = [
    { name: 'Travel Planning', path: '/travel-planning' }, 
    { name: 'Recommend Destination', path: '/destination' },
  ];
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
      <div className="container px-6 py-12 mx-auto lg:px-8">
        <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <SiresitaLogo />
              <span className="ml-3 text-xl font-bold tracking-tight text-white">SIRESITA</span>
            </div>
            <p className="text-sm text-blue-100">
              Jelajahi Sumatera dengan cara baru bersama SIRESITA. Dapatkan rekomendasi cerdas, perencanaan mudah, dan temukan destinasi unik sesuai minat Anda.
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-blue-300 uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-blue-100 transition-colors duration-300 hover:text-white hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-blue-300 uppercase">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-blue-100 transition-colors duration-300 hover:text-white hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-blue-300 uppercase">Contact Us</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li className="flex items-start">
                <LocationIcon />
                <span className="ml-3">Sumatera Utara, Indonesia</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon />
                <a href="tel:+626661234567" className="ml-3 transition-colors duration-300 hover:text-white hover:underline">
                  +62 (666) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <EmailIcon />
                <a href="mailto:info@siresita.com" className="ml-3 transition-colors duration-300 hover:text-white hover:underline">
                  info@siresita.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-blue-500">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-xs text-blue-200">&copy; {new Date().getFullYear()} SIRESITA. All rights reserved.</p>
            <div className="flex mt-4 space-x-5 md:mt-0">
              {legalLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-xs text-blue-200 transition-colors duration-300 hover:text-white hover:underline">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}