import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import destinations from "../components/sections/destinations";

const Destinationdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((item) => String(item.id) === String(id));
  const contentRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');

  const [bookmarked, setBookmarked] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    return saved.some((item) => String(item.id) === String(id));
  });

  // State untuk form ulasan
  const [reviewForm, setReviewForm] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const calculatedHeight = Math.max(300, Math.min(contentHeight, 500));
      setImageHeight(`${calculatedHeight}px`);
    }
  }, [destination]);

  if (!destination) {
    return <div className="p-8">Destinasi tidak ditemukan.</div>;
  }

  {/* simoan hapus bookmark di localStorage */} 
  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!bookmarked) {
      bookmarks.push(destination);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(true);
    } else {
      bookmarks = bookmarks.filter((item) => String(item.id) !== String(destination.id));
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(false);
    }
  };

  // Handle form submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.review && reviewForm.rating > 0) {
      console.log('Review submitted:', reviewForm);
      // Reset form
      setReviewForm({ name: '', review: '', rating: 0 });
      alert('Ulasan berhasil dikirim!');
    } else {
      alert('Mohon lengkapi semua field dan berikan rating!');
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
            className="absolute left-0 w-1/2 h-full z-10 focus:outline-none"
            onMouseEnter={() => onHover(i - 0.5)}
            onMouseLeave={onLeave}
            onClick={() => onRatingChange(i - 0.5)}
          />
          {/* Right half of star */}
          <button
            type="button"
            className="absolute right-0 w-1/2 h-full z-10 focus:outline-none"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onLeave}
            onClick={() => onRatingChange(i)}
          />
          
          <svg
            className="w-8 h-8 transition-colors cursor-pointer relative"
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
          <label className="text-sm text-gray-600">Atau masukkan rating manual:</label>
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
            className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="4.6"
          />
          <span className="text-sm text-gray-500">(0.0 - 5.0)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg mt-14 md:mt-24 p-0 md:p-8 min-h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 md:items-start">
        <div className="relative w-full">
          {/* Tombol kembali */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow transition z-10"
            title="Kembali">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            style={{ height: window.innerWidth >= 768 ? imageHeight : '256px' }}
          />
        </div>

        {/* Detail destinasi */}
        <div ref={contentRef} className="flex flex-col justify-start p-6 md:p-0">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-0 flex items-center gap-3">
                {destination.name}
                {/* Rating */}
                <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-semibold text-base">
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
            <p className="font-bold text-blue-700 text-lg md:text-xl">{destination.price}</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* Ulasan */}
      <div className="px-6 md:px-0 mt-8 md:mt-12 pb-8">
        <h2 className="text-2xl font-bold mb-4">Ulasan Pengunjung</h2>
        <div className="space-y-4">

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className='font-semibold'>Tia</span>
              <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-base">
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
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className='font-semibold'>Tia</span>
              <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-base">
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
          <div className="bg-white rounded-lg shadow mt-8 p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Tulis Ulasan Anda</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Anda
                </label>
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
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
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