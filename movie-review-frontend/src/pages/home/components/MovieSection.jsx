import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import MovieCard from './MovieCard';

const MovieSection = ({ 
  title, 
  movies, 
  viewAllLink, 
  cardSize = 'default',
  showViewAll = true,
  className = '' 
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef?.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef?.current) {
      const cardWidth = cardSize === 'small' ? 160 : cardSize === 'large' ? 240 : 200;
      scrollRef?.current?.scrollBy({
        left: -cardWidth * 2,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef?.current) {
      const cardWidth = cardSize === 'small' ? 160 : cardSize === 'large' ? 240 : 200;
      scrollRef?.current?.scrollBy({
        left: cardWidth * 2,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies]);

  if (!movies || movies?.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h2>
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="w-8 h-8"
                aria-label="Scroll left"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="w-8 h-8"
                aria-label="Scroll right"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
          
          {showViewAll && viewAllLink && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              asChild
            >
              <Link to={viewAllLink}>
                View All
              </Link>
            </Button>
          )}
        </div>

        {/* Movies Scroll Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {movies?.map((movie) => (
              <MovieCard
                key={movie?.id}
                movie={movie}
                size={cardSize}
              />
            ))}
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:block">
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background shadow-lg transition-all duration-200 z-10"
                aria-label="Scroll left"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
            )}
            
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background shadow-lg transition-all duration-200 z-10"
                aria-label="Scroll right"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="md:hidden mt-4 flex justify-center space-x-1">
          {Array.from({ length: Math.ceil(movies?.length / 2) })?.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;