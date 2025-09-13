import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RatingSelector = ({ rating = 0, onRatingChange, showLabel = false, size = 'default' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    small: 18,
    default: 24,
    large: 32
  };

  const starSize = starSizes?.[size] || starSizes?.default;

  const getRatingLabel = (rating) => {
    if (rating === 0) return '';
    const labels = {
      1: 'Terrible',
      2: 'Poor',
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    };
    return labels?.[rating] || '';
  };

  const handleStarClick = (starRating) => {
    // Allow clicking same star to clear rating
    const newRating = rating === starRating ? 0 : starRating;
    onRatingChange?.(newRating);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5]?.map((star) => {
          const isActive = star <= (hoverRating || rating);
          return (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-colors duration-150 hover:scale-110 transform"
              type="button"
            >
              <Icon
                name={isActive ? "Star" : "Star"}
                size={starSize}
                className={`transition-colors ${
                  isActive
                    ? 'text-yellow-500 fill-current' :'text-muted-foreground hover:text-yellow-400'
                }`}
                fill={isActive ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
      {showLabel && (hoverRating || rating) > 0 && (
        <p className="text-sm font-medium text-foreground">
          {getRatingLabel(hoverRating || rating)} ({hoverRating || rating}/5)
        </p>
      )}
      {showLabel && rating === 0 && !hoverRating && (
        <p className="text-sm text-muted-foreground">Click stars to rate</p>
      )}
    </div>
  );
};

export default RatingSelector;