import React from 'react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

const MovieGrid = ({ 
  movies = [], 
  isLoading = false, 
  className = '',
  emptyStateMessage = 'No movies found',
  emptyStateDescription = 'Try adjusting your search or filters to find more movies.'
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 ${className}`}>
        {Array.from({ length: 12 })?.map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!movies || movies?.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h2m0 0h10M9 7h6m-6 4h6m-6 4h6"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {emptyStateMessage}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {emptyStateDescription}
        </p>
      </div>
    );
  }

  // Movies grid
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 ${className}`}>
      {movies?.map((movie) => (
        <MovieCard
          key={movie?.id}
          movie={movie}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
};

// Grid with different layouts for different contexts
export const CompactMovieGrid = ({ movies = [], isLoading = false, className = '' }) => {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 ${className}`}>
        {Array.from({ length: 16 })?.map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 ${className}`}>
      {movies?.map((movie) => (
        <MovieCard
          key={movie?.id}
          movie={movie}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
};

// List view variant
export const MovieList = ({ movies = [], isLoading = false, className = '' }) => {
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 6 })?.map((_, index) => (
          <div key={index} className="flex space-x-4 p-4 bg-card border border-border rounded-lg">
            <div className="w-16 h-24 bg-muted rounded animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-32 animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {movies?.map((movie) => (
        <div key={movie?.id} className="flex space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
          <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded">
            <img
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 truncate">
              {movie?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {movie?.year}
            </p>
            {movie?.genres && (
              <div className="flex flex-wrap gap-1 mb-2">
                {movie?.genres?.slice(0, 3)?.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
            {movie?.rating && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-warning fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-foreground">
                  {movie?.rating?.toFixed(1)}
                </span>
                {movie?.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({movie?.reviewCount?.toLocaleString()})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;