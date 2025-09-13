import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MovieCard = ({ 
  movie, 
  isSelected, 
  onSelectionChange, 
  onMovieClick, 
  onRemoveMovie, 
  onTogglePriority,
  onWriteReview 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = (e) => {
    // Don't trigger if clicking on actions or checkbox
    if (e?.target?.closest('.movie-actions') || e?.target?.closest('input[type="checkbox"]')) {
      return;
    }
    onMovieClick();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-500 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <div key="half" className="relative">
          <Icon name="Star" size={12} className="text-muted-foreground" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div 
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-20">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectionChange(e?.target?.checked)}
            className="w-4 h-4 text-primary border-2 border-white rounded focus:ring-ring focus:ring-2 shadow-sm"
            onClick={(e) => e?.stopPropagation()}
          />
        </label>
      </div>
      {/* Priority Badge */}
      {movie?.priority && (
        <div className="absolute top-3 right-3 z-20">
          <div className="px-2 py-1 bg-error text-error-foreground text-xs rounded-full font-medium">
            <Icon name="Star" size={10} className="inline mr-1" />
            Priority
          </div>
        </div>
      )}
      {/* Watched Badge */}
      {movie?.watched && (
        <div className="absolute top-12 right-3 z-20">
          <div className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full font-medium">
            <Icon name="CheckCircle" size={10} className="inline mr-1" />
            Watched
          </div>
        </div>
      )}
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] bg-muted">
        <img
          src={movie?.poster}
          alt={`${movie?.title} poster`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
        
        {/* Quick Actions Overlay */}
        <div className={`movie-actions absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onMovieClick();
            }}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors"
            title="View Details"
          >
            <Icon name="Eye" size={16} />
          </button>
          
          {movie?.watched && (
            <button
              onClick={(e) => {
                e?.stopPropagation();
                onWriteReview();
              }}
              className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
              title="Write Review"
            >
              <Icon name="Edit3" size={16} />
            </button>
          )}
          
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onTogglePriority();
            }}
            className={`p-2 rounded-full transition-colors ${
              movie?.priority 
                ? 'bg-error text-error-foreground hover:bg-error/80' 
                : 'bg-warning text-warning-foreground hover:bg-warning/80'
            }`}
            title={movie?.priority ? 'Remove Priority' : 'Mark as Priority'}
          >
            <Icon name="Star" size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onRemoveMovie();
            }}
            className="p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
            title="Remove from Watchlist"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>
      {/* Movie Info */}
      <div className="p-4 space-y-2">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie?.title}
          </h3>
          <p className="text-sm text-muted-foreground">({movie?.year})</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(movie?.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">
            {movie?.rating?.toFixed(1)}
          </span>
        </div>

        {/* User Rating */}
        {movie?.userRating && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">My rating:</span>
            <div className="flex items-center gap-1">
              {renderStars(movie?.userRating)}
            </div>
            <span className="font-medium text-foreground">
              {movie?.userRating}/5
            </span>
          </div>
        )}

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {movie?.genres?.slice(0, 2)?.map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie?.genres?.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{movie?.genres?.length - 2} more
            </span>
          )}
        </div>

        {/* Date Added */}
        <div className="text-xs text-muted-foreground pt-2 border-t border-border">
          Added {new Date(movie.dateAdded)?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;