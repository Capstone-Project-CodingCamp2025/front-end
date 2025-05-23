import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Alldestination from './Alldestination';
import BookmarkPage from './BookmarkPage';
import ExploreMore from './ExploreMore';

export default function HomeUser() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar /> 
      <section className="flex-grow">
        <Hero />
      </section>
      <Alldestination />
      <BookmarkPage />
      <ExploreMore />
    </main>
  );
}