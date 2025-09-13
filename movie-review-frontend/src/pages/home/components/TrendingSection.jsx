import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { WatchlistCompact } from '../../../components/ui/WatchlistButton';

const TrendingSection = ({ className = '' }) => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [trendingMovies, setTrendingMovies] = useState([]);

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const mockTrendingData = {
    today: [
      {
        id: 1,
        title: "Dune: Part Two",
        year: 2024,
        rating: 8.5,
        genre: "Sci-Fi",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
        viewCount: 15420,
        reviewCount: 342,
        trendingRank: 1,
        changeDirection: 'up',
        changeAmount: 3
      },
      {
        id: 2,
        title: "Oppenheimer",
        year: 2023,
        rating: 8.3,
        genre: "Biography",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        viewCount: 12890,
        reviewCount: 287,
        trendingRank: 2,
        changeDirection: 'down',
        changeAmount: 1
      },
      {
        id: 3,
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        rating: 8.7,
        genre: "Animation",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
        viewCount: 11250,
        reviewCount: 198,
        trendingRank: 3,
        changeDirection: 'up',
        changeAmount: 2
      },
      {
        id: 4,
        title: "The Batman",
        year: 2022,
        rating: 7.8,
        genre: "Action",
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        viewCount: 9870,
        reviewCount: 156,
        trendingRank: 4,
        changeDirection: 'same',
        changeAmount: 0
      },
      {
        id: 5,
        title: "Top Gun: Maverick",
        year: 2022,
        rating: 8.2,
        genre: "Action",
        poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        viewCount: 8940,
        reviewCount: 203,
        trendingRank: 5,
        changeDirection: 'up',
        changeAmount: 1
      }
    ],
    week: [
      {
        id: 6,
        title: "Barbie",
        year: 2023,
        rating: 7.2,
        genre: "Comedy",
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        viewCount: 25420,
        reviewCount: 542,
        trendingRank: 1,
        changeDirection: 'up',
        changeAmount: 5
      }
    ],
    month: [
      {
        id: 7,
        title: "Avatar: The Way of Water",
        year: 2022,
        rating: 7.6,
        genre: "Sci-Fi",
        poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
        viewCount: 45230,
        reviewCount: 892,
        trendingRank: 1,
        changeDirection: 'up',
        changeAmount: 2
      }
    ]
  };

  useEffect(() => {
    setTrendingMovies(mockTrendingData?.[timeFilter] || mockTrendingData?.today);
  }, [timeFilter]);

  const getTrendingIcon = (direction, amount) => {
    if (direction === 'up') return { icon: 'TrendingUp', color: 'text-success' };
    if (direction === 'down') return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000)?.toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000)?.toFixed(1)}K`;
    return count?.toString();
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Trending Movies
            </h2>
            <p className="text-muted-foreground">
              Most popular movies right now
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeFilters?.map((filter) => (
              <button
                key={filter?.value}
                onClick={() => setTimeFilter(filter?.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeFilter === filter?.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trending List */}
        <div className="grid gap-4">
          {trendingMovies?.map((movie, index) => {
            const trendingInfo = getTrendingIcon(movie?.changeDirection, movie?.changeAmount);
            
            return (
              <div
                key={movie?.id}
                className="bg-card rounded-lg p-4 hover:bg-card/80 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-2xl font-bold text-primary">
                      {movie?.trendingRank}
                    </span>
                  </div>

                  {/* Movie Poster */}
                  <div className="flex-shrink-0 w-16 h-20 rounded-md overflow-hidden">
                    <Link to={`/movie-details?id=${movie?.id}`}>
                      <Image
                        src={movie?.poster}
                        alt={movie?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/movie-details?id=${movie?.id}`}>
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {movie?.title}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                      <span>{movie?.year}</span>
                      <span>•</span>
                      <span>{movie?.genre}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-secondary fill-current" />
                        <span>{movie?.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex flex-col items-end space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{formatViewCount(movie?.viewCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={14} />
                      <span>{movie?.reviewCount}</span>
                    </div>
                  </div>

                  {/* Trending Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${trendingInfo?.color}`}>
                      <Icon name={trendingInfo?.icon} size={16} />
                      {movie?.changeAmount > 0 && (
                        <span className="text-sm font-medium">
                          {movie?.changeAmount}
                        </span>
                      )}
                    </div>
                    
                    {/* Watchlist Button */}
                    <WatchlistCompact
                      movieId={movie?.id}
                      movieTitle={movie?.title}
                      moviePoster={movie?.poster}
                      movieYear={movie?.year}
                      onToggle={() => {}}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            asChild
          >
            <Link to="/movie-listings?filter=trending">
              View All Trending Movies
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;