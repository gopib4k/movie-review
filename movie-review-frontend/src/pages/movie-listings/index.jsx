import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import MovieGrid, { CompactMovieGrid, MovieList } from './components/MovieGrid';
import Pagination from './components/Pagination';
import ViewToggle from './components/ViewToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MovieListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity'
  });

  // Mock movie data
  const mockMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      reviewCount: 2847,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Action", "Crime", "Drama"]
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      reviewCount: 2156,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Action", "Sci-Fi", "Thriller"]
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      reviewCount: 1892,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Adventure", "Drama", "Sci-Fi"]
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.3,
      reviewCount: 3245,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Drama"]
    },
    {
      id: 5,
      title: "Pulp Fiction",
      year: 1994,
      rating: 8.9,
      reviewCount: 2678,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Crime", "Drama"]
    },
    {
      id: 6,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      reviewCount: 2934,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Crime", "Drama"]
    },
    {
      id: 7,
      title: "Forrest Gump",
      year: 1994,
      rating: 8.8,
      reviewCount: 2456,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Drama", "Romance"]
    },
    {
      id: 8,
      title: "The Matrix",
      year: 1999,
      rating: 8.7,
      reviewCount: 2123,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Action", "Sci-Fi"]
    },
    {
      id: 9,
      title: "Goodfellas",
      year: 1990,
      rating: 8.7,
      reviewCount: 1876,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Biography", "Crime", "Drama"]
    },
    {
      id: 10,
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
      rating: 8.9,
      reviewCount: 2567,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Action", "Adventure", "Drama"]
    },
    {
      id: 11,
      title: "Fight Club",
      year: 1999,
      rating: 8.8,
      reviewCount: 2234,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Drama"]
    },
    {
      id: 12,
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
      rating: 8.6,
      reviewCount: 1987,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      id: 13,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      rating: 8.8,
      reviewCount: 2345,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Action", "Adventure", "Drama"]
    },
    {
      id: 14,
      title: "One Flew Over the Cuckoo\'s Nest",
      year: 1975,
      rating: 8.7,
      reviewCount: 1654,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Drama"]
    },
    {
      id: 15,
      title: "Casablanca",
      year: 1942,
      rating: 8.5,
      reviewCount: 1432,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Drama", "Romance", "War"]
    },
    {
      id: 16,
      title: "The Silence of the Lambs",
      year: 1991,
      rating: 8.6,
      reviewCount: 1876,
      poster: "https://images.unsplash.com/photo-1489599904472-c73c3d1b5b4f?w=400&h=600&fit=crop",
      genres: ["Crime", "Drama", "Thriller"]
    },
    {
      id: 17,
      title: "Saving Private Ryan",
      year: 1998,
      rating: 8.6,
      reviewCount: 1765,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genres: ["Drama", "War"]
    },
    {
      id: 18,
      title: "Schindler\'s List",
      year: 1993,
      rating: 8.9,
      reviewCount: 2123,
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      genres: ["Biography", "Drama", "History"]
    }
  ];

  // Initialize from URL parameters
  useEffect(() => {
    const query = searchParams?.get('search') || '';
    const genre = searchParams?.get('genre') || '';
    const year = searchParams?.get('year') || '';
    const rating = searchParams?.get('rating') || '';
    const sortBy = searchParams?.get('sort') || 'popularity';
    const page = parseInt(searchParams?.get('page')) || 1;
    const view = searchParams?.get('view') || 'grid';

    setSearchQuery(query);
    setFilters({ genre, year, rating, sortBy });
    setCurrentPage(page);
    setCurrentView(view);
  }, [searchParams]);

  // Fetch movies based on current filters and search
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredMovies = [...mockMovies];
    
    // Apply search filter
    if (searchQuery) {
      filteredMovies = filteredMovies?.filter(movie =>
        movie?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        movie?.genres?.some(genre => genre?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }
    
    // Apply genre filter
    if (filters?.genre) {
      filteredMovies = filteredMovies?.filter(movie =>
        movie?.genres?.some(genre => genre?.toLowerCase() === filters?.genre?.toLowerCase())
      );
    }
    
    // Apply year filter
    if (filters?.year) {
      if (filters?.year?.includes('-')) {
        const [startYear, endYear] = filters?.year?.split('-')?.map(Number);
        filteredMovies = filteredMovies?.filter(movie =>
          movie?.year >= startYear && movie?.year <= endYear
        );
      } else {
        filteredMovies = filteredMovies?.filter(movie =>
          movie?.year?.toString() === filters?.year
        );
      }
    }
    
    // Apply rating filter
    if (filters?.rating) {
      const minRating = parseFloat(filters?.rating);
      filteredMovies = filteredMovies?.filter(movie =>
        movie?.rating >= minRating
      );
    }
    
    // Apply sorting
    switch (filters?.sortBy) {
      case 'rating':
        filteredMovies?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'release_date':
        filteredMovies?.sort((a, b) => b?.year - a?.year);
        break;
      case 'title':
        filteredMovies?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'year':
        filteredMovies?.sort((a, b) => b?.year - a?.year);
        break;
      default: // popularity
        filteredMovies?.sort((a, b) => b?.reviewCount - a?.reviewCount);
    }
    
    // Pagination
    const itemsPerPage = 18;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMovies = filteredMovies?.slice(startIndex, endIndex);
    
    setMovies(paginatedMovies);
    setTotalResults(filteredMovies?.length);
    setTotalPages(Math.ceil(filteredMovies?.length / itemsPerPage));
    setIsLoading(false);
  }, [searchQuery, filters, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Update URL parameters
  const updateURLParams = useCallback((newParams) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams)?.forEach(([key, value]) => {
      if (value) {
        params?.set(key, value);
      } else {
        params?.delete(key);
      }
    });
    
    // Reset page when filters change
    if (newParams?.search !== undefined || newParams?.genre !== undefined || 
        newParams?.year !== undefined || newParams?.rating !== undefined || 
        newParams?.sort !== undefined) {
      params?.delete('page');
    }
    
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURLParams({ search: query, page: null });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    updateURLParams({
      genre: newFilters?.genre,
      year: newFilters?.year,
      rating: newFilters?.rating,
      sort: newFilters?.sortBy,
      page: null
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURLParams({ page: page?.toString() });
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    updateURLParams({ view });
  };

  const renderMovieGrid = () => {
    switch (currentView) {
      case 'list':
        return (
          <MovieList
            movies={movies}
            isLoading={isLoading}
            className="mb-8"
          />
        );
      case 'compact':
        return (
          <CompactMovieGrid
            movies={movies}
            isLoading={isLoading}
            className="mb-8"
          />
        );
      default:
        return (
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            className="mb-8"
            emptyStateMessage={searchQuery ? `No movies found for "${searchQuery}"` : "No movies found"}
            emptyStateDescription={searchQuery ? "Try searching with different keywords or adjust your filters." : "Try adjusting your filters to find more movies."}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Movie Listings - CineReview</title>
        <meta name="description" content="Browse and discover movies with advanced filtering options. Find your next favorite film from our extensive collection." />
        <meta name="keywords" content="movies, films, browse movies, movie search, movie filters, cinema" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Movies'}
                </h1>
                <p className="text-muted-foreground">
                  Discover your next favorite movie from our extensive collection
                </p>
              </div>
              
              {/* View Toggle - Desktop */}
              <div className="hidden sm:block">
                <ViewToggle
                  currentView={currentView}
                  onViewChange={handleViewChange}
                  showLabels={true}
                />
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              initialQuery={searchQuery}
              className="mb-6"
            />
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterPanelOpen}
            onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            resultsCount={totalResults}
            isLoading={isLoading}
          />

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {!isLoading && (
                <p className="text-sm text-muted-foreground">
                  {totalResults?.toLocaleString()} movies found
                </p>
              )}
              
              {/* Active Filters */}
              {(filters?.genre || filters?.year || filters?.rating || searchQuery) && (
                <div className="flex items-center space-x-2">
                  <Icon name="Filter" size={14} className="text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        Search: {searchQuery}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSearch('')}
                          className="ml-1 w-4 h-4 p-0 hover:bg-primary/20"
                        >
                          <Icon name="X" size={10} />
                        </Button>
                      </span>
                    )}
                    {filters?.genre && (
                      <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
                        Genre: {filters?.genre}
                      </span>
                    )}
                    {filters?.year && (
                      <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                        Year: {filters?.year}
                      </span>
                    )}
                    {filters?.rating && (
                      <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-md">
                        Rating: {filters?.rating}+ stars
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* View Toggle - Mobile */}
            <div className="sm:hidden">
              <ViewToggle
                currentView={currentView}
                onViewChange={handleViewChange}
              />
            </div>
          </div>

          {/* Movie Grid */}
          {renderMovieGrid()}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalResults}
              itemsPerPage={18}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}

          {/* Back to Top Button */}
          {!isLoading && movies?.length > 0 && (
            <div className="fixed bottom-6 right-6 z-100">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="shadow-lg elevation-2"
                title="Back to top"
              >
                <Icon name="ArrowUp" size={20} />
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MovieListings;