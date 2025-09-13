import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { WatchlistFAB } from '../../../components/ui/WatchlistButton';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      year: 2024,
      rating: 8.5,
      genre: "Sci-Fi, Adventure",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      duration: "166 min",
      director: "Denis Villeneuve"
    },
    {
      id: 2,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.3,
      genre: "Biography, Drama, History",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A thrilling tale of scientific discovery and moral complexity.",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop",
      duration: "180 min",
      director: "Christopher Nolan"
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      year: 2023,
      rating: 8.7,
      genre: "Animation, Action, Adventure",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
      duration: "140 min",
      director: "Joaquim Dos Santos"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredMovies?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies?.length) % featuredMovies?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentMovie = featuredMovies?.[currentSlide];

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie?.backdrop}
          alt={currentMovie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Movie Info */}
            <div className="mb-4">
              <div className="flex items-center space-x-4 mb-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                  Featured
                </span>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{currentMovie?.year}</span>
                  <span>•</span>
                  <span>{currentMovie?.duration}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-secondary fill-current" />
                    <span>{currentMovie?.rating}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                {currentMovie?.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {currentMovie?.genre}
              </p>
            </div>

            {/* Description */}
            <p className="text-foreground/90 text-lg leading-relaxed mb-8 max-w-xl">
              {currentMovie?.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                iconPosition="left"
                asChild
              >
                <Link to={`/movie-details?id=${currentMovie?.id}`}>
                  Watch Details
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="BookmarkPlus"
                iconPosition="left"
              >
                Add to Watchlist
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconName="Info"
                iconPosition="left"
                asChild
              >
                <Link to={`/movie-details?id=${currentMovie?.id}`}>
                  More Info
                </Link>
              </Button>
            </div>

            {/* Director Info */}
            <div className="mt-6 flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="User" size={14} />
              <span>Directed by {currentMovie?.director}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-20"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-20"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredMovies?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary scale-125' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
        </button>
      </div>
      {/* Watchlist FAB */}
      <WatchlistFAB
        movieId={currentMovie?.id}
        movieTitle={currentMovie?.title}
        moviePoster={currentMovie?.poster}
        movieYear={currentMovie?.year}
        onToggle={() => {}}
        className="absolute top-16 right-4 z-20"
      />
    </div>
  );
};

export default HeroCarousel;