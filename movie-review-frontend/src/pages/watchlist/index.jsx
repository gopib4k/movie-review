import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WatchlistHeader from './components/WatchlistHeader';
import FilterSort from './components/FilterSort';
import MovieGrid from './components/MovieGrid';
import EmptyState from './components/EmptyState';
import BulkActions from './components/BulkActions';
import Icon from '../../components/AppIcon';

const WatchlistPage = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [filters, setFilters] = useState({
    genre: 'all',
    decade: 'all',
    rating: 'all',
    watched: 'all'
  });
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock watchlist data
  const mockWatchlistData = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      rating: 4.5,
      userRating: 5,
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=300&h=450&fit=crop",
      genres: ["Action", "Crime", "Drama"],
      dateAdded: "2025-01-10T10:30:00Z",
      watched: true,
      priority: true
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      rating: 4.4,
      userRating: null,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      genres: ["Sci-Fi", "Action", "Thriller"],
      dateAdded: "2025-01-09T15:20:00Z",
      watched: false,
      priority: false
    },
    {
      id: 3,
      title: "Pulp Fiction",
      year: 1994,
      rating: 4.6,
      userRating: 4,
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=300&h=450&fit=crop",
      genres: ["Crime", "Drama"],
      dateAdded: "2025-01-08T09:15:00Z",
      watched: true,
      priority: true
    },
    {
      id: 4,
      title: "Interstellar",
      year: 2014,
      rating: 4.3,
      userRating: null,
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      genres: ["Sci-Fi", "Drama"],
      dateAdded: "2025-01-07T20:45:00Z",
      watched: false,
      priority: false
    },
    {
      id: 5,
      title: "The Godfather",
      year: 1972,
      rating: 4.8,
      userRating: 5,
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=300&h=450&fit=crop",
      genres: ["Crime", "Drama"],
      dateAdded: "2025-01-06T14:30:00Z",
      watched: true,
      priority: true
    },
    {
      id: 6,
      title: "Joker",
      year: 2019,
      rating: 4.3,
      userRating: null,
      poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop",
      genres: ["Drama", "Crime", "Thriller"],
      dateAdded: "2025-01-05T11:20:00Z",
      watched: false,
      priority: false
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: '/watchlist',
          message: 'Please sign in to view your watchlist' 
        }
      });
      return;
    }

    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovies(mockWatchlistData);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [navigate]);

  // Filter and sort movies
  useEffect(() => {
    let filtered = [...movies];

    // Apply filters
    if (filters?.genre !== 'all') {
      filtered = filtered?.filter(movie => 
        movie?.genres?.some(genre => 
          genre?.toLowerCase()?.includes(filters?.genre?.toLowerCase())
        )
      );
    }

    if (filters?.decade !== 'all') {
      const decade = parseInt(filters?.decade);
      filtered = filtered?.filter(movie => 
        Math.floor(movie?.year / 10) * 10 === decade
      );
    }

    if (filters?.rating !== 'all') {
      const minRating = parseFloat(filters?.rating);
      filtered = filtered?.filter(movie => movie?.rating >= minRating);
    }

    if (filters?.watched !== 'all') {
      const isWatched = filters?.watched === 'watched';
      filtered = filtered?.filter(movie => movie?.watched === isWatched);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'title':
          aValue = a?.title?.toLowerCase();
          bValue = b?.title?.toLowerCase();
          break;
        case 'year':
          aValue = a?.year;
          bValue = b?.year;
          break;
        case 'rating':
          aValue = a?.rating;
          bValue = b?.rating;
          break;
        case 'dateAdded':
        default:
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
          break;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredMovies(filtered);
  }, [movies, filters, sortBy, sortOrder]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie-details?id=${movieId}`);
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMovies(prev => prev?.filter(movie => movie?.id !== movieId));
      setSelectedMovies(prev => {
        const newSet = new Set(prev);
        newSet?.delete(movieId);
        return newSet;
      });
      
      // Show feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = 'Movie removed from watchlist';
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  const handleTogglePriority = async (movieId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setMovies(prev => prev?.map(movie => 
        movie?.id === movieId 
          ? { ...movie, priority: !movie?.priority }
          : movie
      ));
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const handleWriteReview = (movieId) => {
    navigate(`/write-review?movieId=${movieId}`);
  };

  const handleBulkRemove = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMovies(prev => prev?.filter(movie => !selectedMovies?.has(movie?.id)));
      setSelectedMovies(new Set());
      
      // Show feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = `${selectedMovies?.size} movies removed from watchlist`;
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error removing movies:', error);
    }
  };

  const handleBulkPriority = async (isPriority) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setMovies(prev => prev?.map(movie => 
        selectedMovies?.has(movie?.id) 
          ? { ...movie, priority: isPriority }
          : movie
      ));
      setSelectedMovies(new Set());
      
      // Show feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = `${selectedMovies?.size} movies ${isPriority ? 'marked as priority' : 'priority removed'}`;
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error updating priorities:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={48} className="text-primary" />
            </div>
            <p className="text-muted-foreground">Loading your watchlist...</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/home', icon: 'Home' },
    { label: 'My Watchlist', path: '/watchlist', icon: 'Bookmark' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Watchlist | CineReview</title>
        <meta name="description" content="Manage your saved movies and track what you want to watch next" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <WatchlistHeader 
          totalMovies={movies?.length}
          watchedCount={movies?.filter(m => m?.watched)?.length}
          priorityCount={movies?.filter(m => m?.priority)?.length}
        />

        {movies?.length > 0 ? (
          <>
            {/* Bulk Actions */}
            {selectedMovies?.size > 0 && (
              <BulkActions
                selectedCount={selectedMovies?.size}
                onBulkRemove={handleBulkRemove}
                onBulkPriority={handleBulkPriority}
                onClearSelection={() => setSelectedMovies(new Set())}
              />
            )}

            {/* Filters and Sorting */}
            <FilterSort
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              resultCount={filteredMovies?.length}
            />

            {/* Movies Grid */}
            <MovieGrid
              movies={filteredMovies}
              selectedMovies={selectedMovies}
              onSelectionChange={setSelectedMovies}
              onMovieClick={handleMovieClick}
              onRemoveMovie={handleRemoveMovie}
              onTogglePriority={handleTogglePriority}
              onWriteReview={handleWriteReview}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;