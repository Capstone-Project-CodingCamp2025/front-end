/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useDestinationDetailPresenter } from '../../presenter/useDestinationDetailPresenter';
import { useState } from 'react';
import useIntersectionObserver from '../../Hook/useIntersectionObserver';

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

const Destinationdetail = () => {
  const {
    destination,
    isLoading,
    error,
    isBookmarked,
    reviews,
    reviewForm,
    isSubmittingReview,
    contentRef,
    imageHeight,
    handleBookmark,
    handleReviewInputChange,
    handleRatingChange,
    handleSubmitReview,
    navigateBack,
  } = useDestinationDetailPresenter();

  const [hoveredRating, setHoveredRating] = useState(0); // State untuk UI StarRating saja

  // Intersection Observer hooks untuk animasi
  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [imageRef, isImageVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contentDetailRef, isContentVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [reviewFormRef, isReviewFormVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [reviewsListRef, isReviewsListVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animation classes
  const baseTransition = 'transition-all duration-700 ease-out';
  const initialStyle = 'opacity-0 translate-y-10';
  const visibleStyle = 'opacity-100 translate-y-0';
  const slideInLeft = 'opacity-0 -translate-x-10';
  const slideInRight = 'opacity-0 translate-x-10';
  const slideVisibleX = 'opacity-100 translate-x-0';
  const scaleUp = 'opacity-0 scale-95';
  const scaleVisible = 'opacity-100 scale-100';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg animate-pulse">Memuat detail destinasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-red-600 text-lg">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-8 border">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M12 6.25a.25.25 0 11-.5 0 .25.25 0 01.5 0zm-7 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm14 0a.25.25 0 11-.5 0 .25.25 0 01.5 0z" />
            </svg>
          </div>
          <p className="text-lg text-gray-600">Destinasi tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-8">
      <div 
        ref={headerRef}
        className={`max-w-6xl mx-auto bg-white rounded-xl shadow-lg mt-14 mb-14 md:mt-24 p-0 md:p-8 min-h-[600px] border border-blue-100 ${baseTransition} ${
          isHeaderVisible ? scaleVisible : scaleUp
        }`}
      >
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8 md:items-start">
          {/* Image Section dengan animasi */}
          <div 
            ref={imageRef}
            className={`relative w-full ${baseTransition} delay-200 ${
              isImageVisible ? slideVisibleX : slideInLeft
            }`}
          >
            <button
              onClick={navigateBack}
              className="absolute z-10 p-2 transition-all duration-300 bg-white rounded-full shadow top-3 left-3 bg-opacity-80 hover:bg-opacity-100 hover:scale-110 transform"
              title="Kembali"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
              <img
                src={destination.image}
                alt={destination.name}
                className="object-cover w-full transition-transform duration-700 hover:scale-105"
                style={{ height: window.innerWidth >= 768 ? imageHeight : '256px' }}
              />
            </div>
          </div>

          {/* Content Section dengan animasi */}
          <div 
            ref={contentDetailRef}
            className={`flex flex-col justify-start p-6 md:p-0 ${baseTransition} delay-300 ${
              isContentVisible ? slideVisibleX : slideInRight
            }`}
          >
            <div>
              <div 
                className={`flex items-center justify-between mb-2 ${baseTransition} delay-400 ${
                  isContentVisible ? visibleStyle : initialStyle
                }`}
              >
                <h1 className="flex items-center gap-3 mb-0 text-3xl font-bold md:text-4xl">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {destination.name}
                  </span>
                  <span className="inline-flex items-center px-4 py-1 text-base font-semibold text-yellow-700 bg-yellow-100 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                    {destination.rating}
                  </span>
                  <button
                    onClick={handleBookmark}
                    aria-label={isBookmarked ? "Hapus Bookmark" : "Simpan ke Bookmark"}
                    className="focus:outline-none transition-all duration-300 hover:scale-110 transform"
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 transition-colors duration-300"
                      fill={isBookmarked ? "#facc15" : "none"}
                      viewBox="0 0 24 24"
                      stroke={isBookmarked ? "#facc15" : "#9ca3af"}
                      strokeWidth={2}
                    > 
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
                    </svg>
                  </button>
                </h1>
              </div>

              <div 
                className={`mb-4 flex items-start text-base md:text-lg ${baseTransition} delay-500 ${
                  isContentVisible ? visibleStyle : initialStyle
                }`}
              >
                <svg className="w-4 h-4 mr-2 mt-1 shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold line-clamp-2">{destination.location}</span> 
              </div>

              <div 
                className={`mb-4 flex items-start text-base md:text-lg ${baseTransition} delay-600 ${
                  isContentVisible ? visibleStyle : initialStyle
                }`}
              >
                <svg className="w-4 h-4 mr-2 mt-1 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                <p className="text-base text-gray-700 leading-relaxed">{destination.description || destination.deskripsi || 'Deskripsi destinasi belum tersedia.'}</p>
              </div>

              <div 
                className={`flex items-center text-sm text-blue-600 font-medium ${baseTransition} delay-700 ${
                  isContentVisible ? visibleStyle : initialStyle
                }`}
              >
                <svg className="w-4 h-4 mr-2 shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{destination.kategori || destination.category}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-t-2 border-gray-200" />

        {/* Review Form Section dengan animasi */}
        <div className="px-6 pb-8 mt-8 md:px-0 md:mt-12">
          <div 
            ref={reviewFormRef}
            className={`p-4 mt-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md md:p-6 border border-blue-100 ${baseTransition} ${
              isReviewFormVisible ? visibleStyle : initialStyle
            }`}
          >
            <h3 
              className={`mb-4 text-lg font-semibold text-gray-800 ${baseTransition} delay-100 ${
                isReviewFormVisible ? visibleStyle : initialStyle
              }`}
            >
              ✨ Tulis Ulasan Anda
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div 
                className={`${baseTransition} delay-200 ${
                  isReviewFormVisible ? visibleStyle : initialStyle
                }`}
              >
                <input
                  type="text"
                  name="name" 
                  placeholder="Nama Anda"
                  value={reviewForm.name}
                  onChange={handleReviewInputChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                  required
                />
              </div>
              <div 
                className={`${baseTransition} delay-300 ${
                  isReviewFormVisible ? visibleStyle : initialStyle
                }`}
              >
                <span className="block mb-2 text-sm font-medium text-gray-700">Rating Anda</span>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={handleRatingChange}
                  hoveredRating={hoveredRating}
                  onHover={setHoveredRating}
                  onLeave={() => setHoveredRating(0)}
                />
              </div>
              <div 
                className={`${baseTransition} delay-400 ${
                  isReviewFormVisible ? visibleStyle : initialStyle
                }`}
              >
                <textarea
                  name="review" 
                  placeholder="Tulis ulasan di sini..."
                  value={reviewForm.review}
                  onChange={handleReviewInputChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-none"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingReview}
                className={`px-6 py-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${baseTransition} delay-500 ${
                  isReviewFormVisible ? visibleStyle : initialStyle
                }`}
              > 
                {isSubmittingReview ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim...</span>
                  </div>
                ) : (
                  'Kirim Ulasan'
                )}
              </button>
            </form>
          </div>

          <hr className="my-8 border-t-2 border-gray-200" />
          
          {/* Reviews List Section dengan animasi */}
          <div 
            ref={reviewsListRef}
            className={`${baseTransition} ${
              isReviewsListVisible ? visibleStyle : initialStyle
            }`}
          >
            <h2 
              className={`mb-6 text-2xl font-bold text-gray-800 ${baseTransition} delay-100 ${
                isReviewsListVisible ? visibleStyle : initialStyle
              }`}
            >
              💬 Ulasan Pengunjung
            </h2>
            <div className="space-y-6">
              {reviews.length > 0 ? reviews.map((review, index) => (
                <div 
                  key={review.id || index} 
                  className={`p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] ${baseTransition}`}
                  style={{ animationDelay: `${200 + (index * 100)}ms` }}
                >
                  <div 
                    className={`flex items-center gap-2 mb-2 ${baseTransition} delay-${200 + (index * 100)} ${
                      isReviewsListVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(review.userName || review.name || 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className='font-semibold text-gray-800'>{review.userName || review.name || 'Anonim'}</span>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full shadow-sm">
                      ⭐ {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <p 
                    className={`text-gray-700 leading-relaxed ${baseTransition} delay-${300 + (index * 100)} ${
                      isReviewsListVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    {review.review}
                  </p>
                </div>
              )) : (
                <div 
                  className={`text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 ${baseTransition} delay-200 ${
                    isReviewsListVisible ? visibleStyle : initialStyle
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">Belum ada ulasan untuk destinasi ini.</p>
                  <p className="text-gray-400 text-sm mt-2">Jadilah yang pertama memberikan ulasan! ✨</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destinationdetail;