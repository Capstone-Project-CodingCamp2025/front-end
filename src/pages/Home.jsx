/* eslint-disable no-unused-vars */
// import Footer from '../components/Footer.jsx';
// import Navbar from '../components/Navbar.jsx';
import DestinationGrid from '../components/common/DestinationGrid.jsx';
import Hero from '../components/sections/Hero.jsx';
import LoginCTA from '../components/sections/LoginCTA.jsx';

export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <Navbar />
      <main className="flex-grow">
        <Hero />
        <DestinationGrid />
        <LoginCTA />
      </main>
    //   <Footer />
    // </div>
  );
}
