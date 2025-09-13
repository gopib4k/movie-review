import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import WatchlistButton from '../../../components/ui/WatchlistButton';

const MovieHero = ({ movie, onPlayTrailer, onRateMovie, onWriteReview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatRating = (rating) => {
    return rating ? rating?.toFixed(1) : 'N/A';
  };

  return (
    <div className="relative bg-gradient-to-b from-background to-muted">
      {/* Background Backdrop */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src={movie?.backdrop}
          alt={`${movie?.title} backdrop`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 bg-muted rounded-lg overflow-hidden shadow-lg elevation-2">
                <Image
                  src={movie?.poster}
                  alt={`${movie?.title} poster`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Image" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Play Trailer Overlay */}
              <button
                onClick={onPlayTrailer}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              >
                <div className="bg-primary rounded-full p-4 shadow-lg">
                  <Icon name="Play" size={32} color="white" />
                </div>
              </button>
            </div>
          </div>

          {/* Movie Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {movie?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={16} className="mr-1" />
                    {movie?.year}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={16} className="mr-1" />
                    {formatRuntime(movie?.runtime)}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Star" size={16} className="mr-1 text-secondary" />
                    {formatRating(movie?.rating)}
                  </span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie?.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Rating Display */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={20}
                        className={`${
                          star <= Math.round(movie?.rating)
                            ? 'text-secondary fill-current' :'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {formatRating(movie?.rating)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({movie?.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie?.synopsis}
              </p>
            </div>

            {/* Director and Cast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Director</h3>
                <p className="text-muted-foreground">{movie?.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Starring</h3>
                <p className="text-muted-foreground">
                  {movie?.cast?.slice(0, 3)?.map(actor => actor?.name)?.join(', ')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="default"
                onClick={onPlayTrailer}
                iconName="Play"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Watch Trailer
              </Button>

              <WatchlistButton
                movieId={movie?.id}
                movieTitle={movie?.title}
                moviePoster={movie?.poster}
                movieYear={movie?.year}
                variant="outline"
                className="flex-1 sm:flex-none"
                onToggle={() => {}}
              />

              <Button
                variant="outline"
                onClick={onRateMovie}
                iconName="Star"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Rate Movie
              </Button>

              <Button
                variant="ghost"
                onClick={onWriteReview}
                iconName="MessageSquare"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Write Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;