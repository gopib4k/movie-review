import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import WatchlistButton from '../../../components/ui/WatchlistButton';

const UserWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Mock watchlist data
  const mockWatchlist = [
    {
      id: 'tt0111161',
      title: 'The Shawshank Redemption',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2d34d17c1b5?w=300&h=450&fit=crop',
      year: 1994,
      genre: ['Drama'],
      rating: 9.3,
      runtime: 142,
      addedAt: '2024-12-08T10:30:00Z',
      priority: 'high',
      notes: 'Highly recommended by friends'
    },
    {
      id: 'tt0068646',
      title: 'The Godfather',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2d34d17c1b5?w=300&h=450&fit=crop',
      year: 1972,
      genre: ['Crime', 'Drama'],
      rating: 9.2,
      runtime: 175,
      addedAt: '2024-12-05T14:15:00Z',
      priority: 'high',
      notes: 'Classic must-watch'
    },
    {
      id: 'tt0071562',
      title: 'The Godfather Part II',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2d34d17c1b5?w=300&h=450&fit=crop',
      year: 1974,
      genre: ['Crime', 'Drama'],
      rating: 9.0,
      runtime: 202,
      addedAt: '2024-12-03T16:45:00Z',
      priority: 'medium',
      notes: ''
    },
    {
      id: 'tt0108052',
      title: 'Schindler\'s List',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2d34d17c1b5?w=300&h=450&fit=crop',
      year: 1993,
      genre: ['Biography', 'Drama', 'History'],
      rating: 9.0,
      runtime: 195,
      addedAt: '2024-11-30T12:20:00Z',
      priority: 'medium',
      notes: 'For weekend viewing'
    },
    {
      id: 'tt0167260',
      title: 'The Lord of the Rings: The Return of the King',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2d34d17c1b5?w=300&h=450&fit=crop',
      year: 2003,
      genre: ['Action', 'Adventure', 'Drama'],
      rating: 9.0,
      runtime: 201,
      addedAt: '2024-11-28T09:10:00Z',
      priority: 'low',
      notes: 'Rewatch with extended edition'
    }
  ];

  useEffect(() => {
    // Load watchlist from localStorage
    setTimeout(() => {
      const savedWatchlist = JSON.parse(localStorage.getItem('userWatchlist') || '[]');
      if (savedWatchlist?.length > 0) {
        setWatchlist(savedWatchlist);
      } else {
        setWatchlist(mockWatchlist);
        localStorage.setItem('userWatchlist', JSON.stringify(mockWatchlist));
      }
      setIsLoading(false);
    }, 800);
  }, []);

  const sortedWatchlist = [...watchlist]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedAt) - new Date(a.addedAt);
      case 'oldest':
        return new Date(a.addedAt) - new Date(b.addedAt);
      case 'title':
        return a?.title?.localeCompare(b?.title);
      case 'year':
        return b?.year - a?.year;
      case 'rating':
        return b?.rating - a?.rating;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      default:
        return 0;
    }
  });

  const handleRemoveFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist?.filter(movie => movie?.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('userWatchlist', JSON.stringify(updatedWatchlist));
  };

  const handlePriorityChange = (movieId, newPriority) => {
    const updatedWatchlist = watchlist?.map(movie =>
      movie?.id === movieId ? { ...movie, priority: newPriority } : movie
    );
    setWatchlist(updatedWatchlist);
    localStorage.setItem('userWatchlist', JSON.stringify(updatedWatchlist));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6]?.map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">My Watchlist</h2>
          <span className="text-sm text-muted-foreground">({watchlist?.length})</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="newest">Recently Added</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              iconSize={16}
              className="rounded-r-none"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              iconSize={16}
              className="rounded-l-none"
            />
          </div>
        </div>
      </div>
      {sortedWatchlist?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your Watchlist is Empty</h3>
          <p className="text-muted-foreground mb-4">
            Add movies you want to watch to keep track of them
          </p>
          <Button variant="default" asChild>
            <Link to="/movie-listings">Browse Movies</Link>
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedWatchlist?.map((movie) => (
            <div key={movie?.id} className="group relative">
              <div className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
                {/* Movie Poster */}
                <Link to={`/movie-details?id=${movie?.id}`} className="block relative">
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image
                      src={movie?.poster}
                      alt={movie?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Priority Badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                    movie?.priority === 'high' ? 'bg-error text-error-foreground' :
                    movie?.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                    'bg-success text-success-foreground'
                  }`}>
                    {movie?.priority}
                  </div>

                  {/* Remove Button */}
                  <WatchlistButton
                    movieId={movie?.id}
                    movieTitle={movie?.title}
                    moviePoster={movie?.poster}
                    movieYear={movie?.year}
                    size="sm"
                    variant="ghost"
                    showLabel={false}
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-full shadow-lg"
                    onToggle={() => handleRemoveFromWatchlist(movie?.id)}
                  />
                </Link>

                {/* Movie Info */}
                <div className="p-4">
                  <Link 
                    to={`/movie-details?id=${movie?.id}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {movie?.title}
                  </Link>
                  
                  <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                    <span>{movie?.year}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                      <span>{movie?.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{formatRuntime(movie?.runtime)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie?.genre?.slice(0, 2)?.map((g) => (
                      <span key={g} className="px-2 py-1 bg-muted text-xs rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground mt-2">
                    Added {formatDate(movie?.addedAt)}
                  </div>

                  {movie?.notes && (
                    <div className="text-xs text-muted-foreground mt-1 italic">
                      "{movie?.notes}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedWatchlist?.map((movie) => (
            <div key={movie?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <Link to={`/movie-details?id=${movie?.id}`} className="flex-shrink-0">
                <div className="w-16 h-24 rounded-md overflow-hidden">
                  <Image
                    src={movie?.poster}
                    alt={movie?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <Link 
                      to={`/movie-details?id=${movie?.id}`}
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {movie?.title}
                    </Link>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                      <span>{movie?.year}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span>{movie?.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{formatRuntime(movie?.runtime)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${getPriorityColor(movie?.priority)}`}>
                        {movie?.priority?.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Added {formatDate(movie?.addedAt)}
                      </span>
                    </div>
                    {movie?.notes && (
                      <div className="text-sm text-muted-foreground mt-1 italic">
                        "{movie?.notes}"
                      </div>
                    )}
                  </div>

                  <WatchlistButton
                    movieId={movie?.id}
                    movieTitle={movie?.title}
                    moviePoster={movie?.poster}
                    movieYear={movie?.year}
                    size="sm"
                    variant="outline"
                    showLabel={false}
                    className="w-8 h-8 p-0"
                    onToggle={() => handleRemoveFromWatchlist(movie?.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserWatchlist;