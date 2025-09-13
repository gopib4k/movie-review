import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WatchlistButton = ({ 
  movieId, 
  movieTitle, 
  moviePoster, 
  movieYear,
  size = 'default',
  variant = 'ghost',
  showLabel = true,
  className = '',
  onToggle
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    if (token && movieId) {
      checkWatchlistStatus();
    }
  }, [movieId]);

  const checkWatchlistStatus = () => {
    try {
      const watchlist = JSON.parse(localStorage.getItem('userWatchlist') || '[]');
      setIsInWatchlist(watchlist?.some(item => item?.id === movieId));
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: window.location?.pathname,
          message: 'Please sign in to add movies to your watchlist' 
        }
      });
      return;
    }

    if (!movieId) {
      console.error('Movie ID is required');
      return;
    }

    setIsLoading(true);

    try {
      const watchlist = JSON.parse(localStorage.getItem('userWatchlist') || '[]');
      let updatedWatchlist;
      let action;

      if (isInWatchlist) {
        // Remove from watchlist
        updatedWatchlist = watchlist?.filter(item => item?.id !== movieId);
        action = 'removed';
      } else {
        // Add to watchlist
        const movieData = {
          id: movieId,
          title: movieTitle,
          poster: moviePoster,
          year: movieYear,
          addedAt: new Date()?.toISOString()
        };
        updatedWatchlist = [...watchlist, movieData];
        action = 'added';
      }

      localStorage.setItem('userWatchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(!isInWatchlist);

      // Show success feedback
      showFeedback(action);

      // Call onToggle callback if provided
      if (onToggle) {
        onToggle(!isInWatchlist, action);
      }

    } catch (error) {
      console.error('Error updating watchlist:', error);
      showFeedback('error');
    } finally {
      setIsLoading(false);
    }
  };

  const showFeedback = (action) => {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = `fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium transition-all duration-300 ${
      action === 'added' ?'bg-success text-success-foreground' 
        : action === 'removed' ?'bg-warning text-warning-foreground' :'bg-error text-error-foreground'
    }`;
    
    feedback.textContent = 
      action === 'added' 
        ? `Added "${movieTitle}" to watchlist` 
        : action === 'removed'
        ? `Removed "${movieTitle}" from watchlist`
        : 'Something went wrong';

    document.body?.appendChild(feedback);

    // Animate in
    setTimeout(() => {
      feedback.style.transform = 'translateX(0)';
      feedback.style.opacity = '1';
    }, 10);

    // Remove after delay
    setTimeout(() => {
      feedback.style.transform = 'translateX(100%)';
      feedback.style.opacity = '0';
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 300);
    }, 3000);
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Icon name="Loader2" size={size === 'sm' ? 14 : 16} className="animate-spin" />
          {showLabel && <span>Loading...</span>}
        </>
      );
    }

    if (isInWatchlist) {
      return (
        <>
          <Icon 
            name="BookmarkCheck" 
            size={size === 'sm' ? 14 : 16} 
            className="text-success" 
          />
          {showLabel && <span>In Watchlist</span>}
        </>
      );
    }

    return (
      <>
        <Icon 
          name="BookmarkPlus" 
          size={size === 'sm' ? 14 : 16} 
        />
        {showLabel && <span>Add to Watchlist</span>}
      </>
    );
  };

  const getTooltipText = () => {
    if (!isAuthenticated) {
      return 'Sign in to add to watchlist';
    }
    return isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist';
  };

  return (
    <div className="relative group">
      <Button
        variant={variant}
        size={size}
        onClick={handleToggleWatchlist}
        disabled={isLoading}
        className={`flex items-center space-x-2 transition-all duration-200 ${
          isInWatchlist 
            ? 'text-success hover:text-success/80' :'hover:text-primary'
        } ${className}`}
        title={getTooltipText()}
      >
        {getButtonContent()}
      </Button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-200">
        {getTooltipText()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
      </div>
    </div>
  );
};

// Floating Action Button variant for movie cards
export const WatchlistFAB = ({ 
  movieId, 
  movieTitle, 
  moviePoster, 
  movieYear,
  className = '',
  onToggle 
}) => {
  return (
    <WatchlistButton
      movieId={movieId}
      movieTitle={movieTitle}
      moviePoster={moviePoster}
      movieYear={movieYear}
      size="sm"
      variant="ghost"
      showLabel={false}
      className={`absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-full shadow-lg ${className}`}
      onToggle={onToggle}
    />
  );
};

// Compact variant for lists
export const WatchlistCompact = ({ 
  movieId, 
  movieTitle, 
  moviePoster, 
  movieYear,
  className = '',
  onToggle 
}) => {
  return (
    <WatchlistButton
      movieId={movieId}
      movieTitle={movieTitle}
      moviePoster={moviePoster}
      movieYear={movieYear}
      size="sm"
      variant="outline"
      showLabel={false}
      className={`w-8 h-8 p-0 ${className}`}
      onToggle={onToggle}
    />
  );
};

export default WatchlistButton;