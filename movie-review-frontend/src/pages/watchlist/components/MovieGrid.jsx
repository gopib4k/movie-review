import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies, 
  selectedMovies, 
  onSelectionChange, 
  onMovieClick, 
  onRemoveMovie, 
  onTogglePriority,
  onWriteReview 
}) => {
  const handleSelectMovie = (movieId, isSelected) => {
    const newSelected = new Set(selectedMovies);
    if (isSelected) {
      newSelected?.add(movieId);
    } else {
      newSelected?.delete(movieId);
    }
    onSelectionChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedMovies?.size === movies?.length) {
      // Deselect all
      onSelectionChange(new Set());
    } else {
      // Select all
      onSelectionChange(new Set(movies.map(m => m.id)));
    }
  };

  if (!movies || movies?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies match your current filters.</p>
        <button
          onClick={() => window.location?.reload()}
          className="text-primary hover:underline mt-2"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Select All Header */}
      {movies?.length > 1 && (
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedMovies?.size === movies?.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-2 border-input rounded focus:ring-ring focus:ring-2"
            />
            <span className="text-sm text-muted-foreground">
              Select all ({movies?.length} movies)
            </span>
          </label>
        </div>
      )}
      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie?.id}
            movie={movie}
            isSelected={selectedMovies?.has(movie?.id)}
            onSelectionChange={(isSelected) => handleSelectMovie(movie?.id, isSelected)}
            onMovieClick={() => onMovieClick(movie?.id)}
            onRemoveMovie={() => onRemoveMovie(movie?.id)}
            onTogglePriority={() => onTogglePriority(movie?.id)}
            onWriteReview={() => onWriteReview(movie?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;