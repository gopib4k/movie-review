import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { WatchlistFAB } from '../../../components/ui/WatchlistButton';

const MovieCard = ({ movie, size = 'default', showWatchlist = true }) => {
  const cardSizes = {
    small: {
      container: 'w-32 sm:w-36',
      image: 'h-44 sm:h-48',
      title: 'text-sm',
      details: 'text-xs'
    },
    default: {
      container: 'w-40 sm:w-48',
      image: 'h-56 sm:h-64',
      title: 'text-sm sm:text-base',
      details: 'text-xs sm:text-sm'
    },
    large: {
      container: 'w-48 sm:w-56',
      image: 'h-64 sm:h-72',
      title: 'text-base sm:text-lg',
      details: 'text-sm'
    }
  };

  const currentSize = cardSizes?.[size];

  return (
    <div className={`${currentSize?.container} flex-shrink-0 group`}>
      <div className="relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 floating-card">
        {/* Movie Poster */}
        <div className={`relative ${currentSize?.image} overflow-hidden`}>
          <Link to={`/movie-details?id=${movie?.id}`}>
            <Image
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Rating Badge */}
          {movie?.rating && (
            <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-secondary fill-current" />
              <span className="text-xs font-medium text-foreground">
                {movie?.rating}
              </span>
            </div>
          )}

          {/* Watchlist Button */}
          {showWatchlist && (
            <WatchlistFAB
              movieId={movie?.id}
              movieTitle={movie?.title}
              moviePoster={movie?.poster}
              movieYear={movie?.year}
              onToggle={() => {}}
            />
          )}

          {/* Quick Actions on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              asChild
              className="shadow-lg"
            >
              <Link to={`/movie-details?id=${movie?.id}`}>
                Details
              </Link>
            </Button>
          </div>

          {/* New/Featured Badge */}
          {movie?.isNew && (
            <div className="absolute top-2 right-12 bg-primary px-2 py-1 rounded-md">
              <span className="text-xs font-medium text-primary-foreground">
                New
              </span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <Link to={`/movie-details?id=${movie?.id}`}>
            <h3 className={`${currentSize?.title} font-semibold text-card-foreground mb-1 line-clamp-2 hover:text-primary transition-colors`}>
              {movie?.title}
            </h3>
          </Link>
          
          <div className={`${currentSize?.details} text-muted-foreground mb-2`}>
            <div className="flex items-center justify-between">
              <span>{movie?.year}</span>
              {movie?.duration && (
                <span>{movie?.duration}</span>
              )}
            </div>
            {movie?.genre && (
              <p className="line-clamp-1 mt-1">{movie?.genre}</p>
            )}
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between">
            {movie?.viewCount && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Eye" size={12} />
                <span className="text-xs">
                  {movie?.viewCount > 1000 
                    ? `${(movie?.viewCount / 1000)?.toFixed(1)}k` 
                    : movie?.viewCount
                  }
                </span>
              </div>
            )}
            
            {movie?.reviewCount && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="MessageSquare" size={12} />
                <span className="text-xs">{movie?.reviewCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;