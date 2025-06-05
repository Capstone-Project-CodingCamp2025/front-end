// src/components/sections/ReviewForm.jsx
import { useState } from 'react';
import StarRatingInput from '../common/StarRatingInput'; 

const ReviewForm = ({ onSubmit, isLoading }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newError = '';

    if (rating === 0) {
      newError = 'Rating bintang tidak boleh kosong. ';
      formIsValid = false;
    }
    if (reviewText.trim() === '') {
      newError += 'Ulasan tidak boleh kosong.';
      formIsValid = false;
    }
    
    setError(newError.trim());
    if (formIsValid) {
      onSubmit(rating, reviewText);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Tulis Ulasan Anda</h3>
      
      {/* Menampilkan error validasi form global */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      
      <div className="mb-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-1">
            Rating Anda:
          </legend>
          <StarRatingInput 
            rating={rating} 
            setRating={setRating} 
            name="destination-rating" 
          />
        </fieldset>
      </div>

      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
          Ulasan Anda:
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          rows="4"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Bagikan pengalaman Anda tentang destinasi ini..."
          disabled={isLoading}
          aria-required="true" 
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Ulasan'}
      </button>
    </form>
  );
};

export default ReviewForm;