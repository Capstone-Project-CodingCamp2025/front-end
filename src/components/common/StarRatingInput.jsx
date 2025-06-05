import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRatingInput = ({ rating, setRating, totalStars = 5, name = "rating" }) => { 
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const inputId = `${name}-${ratingValue}`; 

        return (
          <label key={index} htmlFor={inputId} className="cursor-pointer"> 
            <input
              type="radio"
              id={inputId} 
              name={name} 
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="sr-only" 
            />
            <FaStar
              size={24}
              className={`mr-1 ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              aria-hidden="true" 
            />
          </label>
        );
      })}
      {rating > 0 && <span className="ml-2 text-sm text-gray-600">({rating} bintang)</span>}
    </div>
  );
};

export default StarRatingInput;