/* eslint-disable no-unused-vars */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getPlaceById } from '../../api/place'; 
import { submitRating, getRatingsForPlace } from '../../api/ratings';
import Swal from 'sweetalert2'; 

const Destinationdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null); // Ubah menjadi state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');

  const [bookmarked, setBookmarked] = useState(false); // State untuk bookmark

  // State untuk form ulasan
  const [reviewForm, setReviewForm] = useState({
    name: '', // Ini bisa diambil dari user yang login nanti
    review: '',
    rating: 0
  });
  const [placeReviews, setPlaceReviews] = useState([]); // State untuk ulasan yang sudah ada

  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPlaceById(id); // Ambil data dari API
        setDestination(data);

        // Setelah destinasi dimuat, cek bookmark
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarked(savedBookmarks.some((item) => String(item.id) === String(data.id)));

        // Ambil ulasan untuk destinasi ini
        const reviewsData = await getRatingsForPlace(id);
        setPlaceReviews(reviewsData);

      } catch (err) {
        setError("Gagal memuat detail destinasi atau ulasan. Silakan coba lagi nanti.");
        console.error("Error fetching destination/reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinationDetails();
  }, [id]); // id sebagai dependency agar fetch ulang saat ID berubah

  useEffect(() => {
    if (destination && contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const calculatedHeight = Math.max(300, Math.min(contentHeight, 500));
      setImageHeight(`${calculatedHeight}px`);
    }
  }, [destination]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-gray-600 text-lg">Memuat detail destinasi...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-red-600 text-lg">{error}</div>;
  }

  if (!destination) {
    return <div className="p-8">Destinasi tidak ditemukan.</div>;
  }

  {/* simoan hapus bookmark di localStorage */} 
 const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!bookmarked) {
      bookmarks.push({ id: destination.id, name: destination.name, image: destination.image, rating: destination.rating, location: destination.location, price: destination.price });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(true);
      Swal.fire({
     icon: 'success',
     title: 'Ditambahkan!',
     text: 'Destinasi berhasil ditambahkan ke bookmark!',
     timer: 1500,
     showConfirmButton: false
   });
    } else {
      bookmarks = bookmarks.filter((item) => String(item.id) !== String(destination.id));
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(false);
      Swal.fire({
     icon: 'info',
     title: 'Dihapus',
     text: 'Destinasi dihapus dari bookmark.',
     timer: 1500,
     showConfirmButton: false
   });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.review || reviewForm.rating <= 0) {
      Swal.fire('Oops...', 'Mohon lengkapi semua field dan berikan rating!', 'error');
      return;
    }
    
    try {
      const newReview = await submitRating(destination.id, reviewForm.rating, reviewForm.review, reviewForm.name);
      setPlaceReviews([...placeReviews, newReview]);
      Swal.fire('Sukses!', 'Ulasan berhasil dikirim!', 'success');
      setReviewForm({ name: '', review: '', rating: 0 });
    } catch (err) {
      console.error('Failed to submit review:', err);
      Swal.fire('Gagal!', err.message || 'Gagal mengirim ulasan. Pastikan Anda sudah login.', 'error');
    }
  };

  // Component untuk star rating dengan half-star support dan input manual
  const StarRating = ({ rating, onRatingChange, hoveredRating, onHover, onLeave }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const filled = (hoveredRating || rating) >= i;
      const halfFilled = !filled && (hoveredRating || rating) >= i - 0.5;
      
      stars.push(
        <div key={i} className="relative">
          {/* Left half of star */}
          <button
            type="button"
            className="absolute left-0 z-10 w-1/2 h-full focus:outline-none"
            onMouseEnter={() => onHover(i - 0.5)}
            onMouseLeave={onLeave}
            onClick={() => onRatingChange(i - 0.5)}
          />
          {/* Right half of star */}
          <button
            type="button"
            className="absolute right-0 z-10 w-1/2 h-full focus:outline-none"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onLeave}
            onClick={() => onRatingChange(i)}
          />
          
          <svg
            className="relative w-8 h-8 transition-colors cursor-pointer"
            viewBox="0 0 24 24"
          >
            {/* Background star (empty) */}
            <path
              fill="none"
              stroke="#d1d5db"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
            
            {/* Filled portion */}
            <defs>
              <clipPath id={`clip-${i}`}>
                <rect 
                  x="0" 
                  y="0" 
                  width={filled ? "24" : halfFilled ? "12" : "0"} 
                  height="24" 
                />
              </clipPath>
            </defs>
            
            {(filled || halfFilled) && (
              <path
                fill="#fbbf24"
                stroke="#fbbf24"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath={`url(#clip-${i})`}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            )}
          </svg>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          {stars}
          <span className="ml-3 text-lg font-medium text-gray-700">
            {(hoveredRating || rating).toFixed(1)}
          </span>
        </div>
        
        {/* Manual input for precise ratings */}
        <div className="flex items-center gap-2">
          <Link className="text-sm text-gray-600">Atau masukkan rating manual:</Link>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (val >= 0 && val <= 5) {
                onRatingChange(val);
              }
            }}
            className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="4.6"
          />
          <span className="text-sm text-gray-500">(0.0 - 5.0)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg mt-14 md:mt-24 p-0 md:p-8 min-h-[600px]">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8 md:items-start">
        <div className="relative w-full">
          {/* Tombol kembali */}
          <button
            onClick={() => navigate(-1)}
            className="absolute z-10 p-2 transition bg-white rounded-full shadow top-3 left-3 bg-opacity-80 hover:bg-opacity-100"
            title="Kembali">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={destination.image}
            alt={destination.name}
            className="object-cover w-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            style={{ height: window.innerWidth >= 768 ? imageHeight : '256px' }}
          />
        </div>

        {/* Detail destinasi */}
        <div ref={contentRef} className="flex flex-col justify-start p-6 md:p-0">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="flex items-center gap-3 mb-0 text-3xl font-bold md:text-4xl">
                {destination.name}
                {/* Rating */}
                <span className="inline-flex items-center px-4 py-1 text-base font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                  <svg className="w-5 h-5 mr-2 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                  </svg>
                  {destination.rating}
                </span>
                {/* Bookmark */}
                <button
                  onClick={handleBookmark}
                  aria-label={bookmarked ? "Hapus Bookmark" : "Simpan ke Bookmark"}
                  className="focus:outline-none"
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill={bookmarked ? "#facc15" : "none"}
                    viewBox="0 0 24 24"
                    stroke={bookmarked ? "#facc15" : "#9ca3af"}
                    strokeWidth={2}
                  > 
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"
                    />
                  </svg>
                </button>
              </h1>
            </div>

            {/* Lokasi/harga */}
            <p className="mb-2 text-base md:text-lg">
              <span className="font-semibold">Lokasi:</span> {destination.location}
            </p>
            <p className="mb-4 text-base md:text-lg">{destination.description || 'Deskripsi destinasi belum tersedia.'}</p>
            <p className="text-lg font-bold text-blue-700 md:text-xl">{destination.price}</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* Ulasan */}
      <div className="px-6 pb-8 mt-8 md:px-0 md:mt-12">
        <h2 className="mb-4 text-2xl font-bold">Ulasan Pengunjung</h2>
        <div className="space-y-4">

          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className='font-semibold'>Tia</span>
              <span className="inline-flex items-center px-3 py-1 text-base font-semibold text-yellow-700 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5 mr-1 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
              </svg>
                  {destination.rating}
              </span>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam rem magnam quia ducimus dolore delectus ad consectetur, perspiciatis facere debitis reprehenderit quae doloribus dignissimos, a tempore pariatur esse in ratione!</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className='font-semibold'>Tia</span>
              <span className="inline-flex items-center px-3 py-1 text-base font-semibold text-yellow-700 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5 mr-1 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
              </svg>
                  {destination.rating}
              </span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero quae rerum voluptates sint laborum, ipsa obcaecati accusantium nostrum error, eligendi reiciendis mollitia dolorum in natus, tempora veniam debitis quidem.</p>
          </div>

            {/* Form Tambah Ulasan */}
          <div className="p-4 mt-8 bg-white rounded-lg shadow md:p-6">
            <h3 className="mb-4 text-lg font-semibold">Tulis Ulasan Anda</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div className="mb-4">
                <Link className="block mb-2 text-sm font-medium text-gray-700">
                  Rating Anda
                </Link>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => setReviewForm({...reviewForm, rating})}
                  hoveredRating={hoveredRating}
                  onHover={setHoveredRating}
                  onLeave={() => setHoveredRating(0)}
                />
              </div>
              
              <div className="mb-4">
                <textarea
                  placeholder="Tulis ulasan di sini..."
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="px-6 py-2 font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
              > 
                Kirim Ulasan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destinationdetail;