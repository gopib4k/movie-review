import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { WatchlistFAB } from '../../../components/ui/WatchlistButton';

const MovieCard = ({ movie, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickRating, setShowQuickRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleQuickRate = (rating) => {
    setUserRating(rating);
    setShowQuickRating(false);
    
    // Save rating to localStorage (in real app, this would be API call)
    const existingRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    existingRatings[movie.id] = {
      rating,
      movieTitle: movie?.title,
      ratedAt: new Date()?.toISOString()
    };
    localStorage.setItem('userRatings', JSON.stringify(existingRatings));

    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 bg-success text-success-foreground rounded-md shadow-lg text-sm font-medium';
    feedback.textContent = `Rated "${movie?.title}" ${rating} stars`;
    document.body?.appendChild(feedback);
    
    setTimeout(() => {
      if (document.body?.contains(feedback)) {
        document.body?.removeChild(feedback);
      }
    }, 3000);
  };

  const formatRating = (rating) => {
    return rating ? rating?.toFixed(1) : 'N/A';
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-success';
    if (rating >= 6) return 'text-warning';
    return 'text-error';
  };

  const formatGenres = (genres) => {
    if (!genres || genres?.length === 0) return [];
    return genres?.slice(0, 2); // Show max 2 genres
  };

  return (
    <div className={`group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 floating-card ${className}`}>
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Link to={`/movie-details?id=${movie?.id}`}>
          <Image
            src={movie?.poster}
            alt={movie?.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <Icon name="Image" size={32} className="text-muted-foreground" />
            </div>
          )}
        </Link>

        {/* Watchlist Button */}
        <WatchlistFAB
          movieId={movie?.id}
          movieTitle={movie?.title}
          moviePoster={movie?.poster}
          movieYear={movie?.year}
          onToggle={() => {}}
        />

        {/* Rating Badge */}
        {movie?.rating && (
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className={`text-xs font-medium ${getRatingColor(movie?.rating)}`}>
              {formatRating(movie?.rating)}
            </span>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="Play"
              iconPosition="left"
              iconSize={14}
              asChild
            >
              <Link to={`/movie-details?id=${movie?.id}`}>
                View Details
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Star"
              iconSize={14}
              onClick={() => setShowQuickRating(!showQuickRating)}
            >
              Rate
            </Button>
          </div>
        </div>
      </div>
      {/* Movie Info */}
      <div className="p-4">
        <div className="mb-2">
          <Link 
            to={`/movie-details?id=${movie?.id}`}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
              {movie?.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            {movie?.year}
          </p>
        </div>

        {/* Genres */}
        {movie?.genres && movie?.genres?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {formatGenres(movie?.genres)?.map((genre, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Rating and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {movie?.rating && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className={`text-sm font-medium ${getRatingColor(movie?.rating)}`}>
                  {formatRating(movie?.rating)}
                </span>
              </div>
            )}
            {movie?.reviewCount && (
              <span className="text-xs text-muted-foreground">
                ({movie?.reviewCount?.toLocaleString()})
              </span>
            )}
          </div>

          {userRating > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="User" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {userRating}/5
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Quick Rating Panel */}
      {showQuickRating && (
        <div className="absolute inset-x-0 bottom-0 bg-card border-t border-border p-4 shadow-lg">
          <div className="text-center mb-2">
            <p className="text-sm font-medium text-foreground">Rate this movie</p>
          </div>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <button
                key={star}
                onClick={() => handleQuickRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Icon
                  name="Star"
                  size={20}
                  className={`transition-colors ${
                    star <= (hoverRating || userRating)
                      ? 'text-warning fill-current' : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickRating(false)}
              iconName="X"
              iconSize={14}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton Card for loading states
export const MovieCardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="aspect-[2/3] bg-muted animate-pulse"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse"></div>
        <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
        <div className="flex space-x-1">
          <div className="h-6 bg-muted rounded w-12 animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-12 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;