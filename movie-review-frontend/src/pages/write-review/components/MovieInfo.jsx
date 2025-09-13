import React from 'react';
import Icon from '../../../components/AppIcon';

const MovieInfo = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <div className="w-32 h-48 bg-muted rounded-md overflow-hidden">
            <img
              src={movie?.poster}
              alt={`${movie?.title} poster`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{movie?.title}</h2>
            <p className="text-muted-foreground">({movie?.year})</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{movie?.runtime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="User" size={14} />
              <span>Dir. {movie?.director}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span>{movie?.rating?.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie?.genres?.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              You're writing a review for this movie. Your insights will help other movie enthusiasts make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;