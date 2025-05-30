/* eslint-disable no-unused-vars */
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/sections/Hero';
import Alldestination from '../destination/Alldestination';
import ExploreMore from '../destination/ExploreMore';
import BookmarkPage from './BookmarkPage';

export default function HomeUser() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow">
        <Hero />
        <Alldestination />
        <BookmarkPage />
        <ExploreMore />
      </section>
      <Footer />
    </main>
  );
}
