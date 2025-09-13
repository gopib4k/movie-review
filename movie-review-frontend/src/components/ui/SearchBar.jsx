import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchBar = ({ className = '', placeholder = 'Search movies...', onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Mock movie suggestions - in real app, this would come from API
  const mockSuggestions = [
    { id: 1, title: 'The Dark Knight', year: 2008, poster: '/assets/images/no_image.png' },
    { id: 2, title: 'Inception', year: 2010, poster: '/assets/images/no_image.png' },
    { id: 3, title: 'Interstellar', year: 2014, poster: '/assets/images/no_image.png' },
    { id: 4, title: 'The Matrix', year: 1999, poster: '/assets/images/no_image.png' },
    { id: 5, title: 'Pulp Fiction', year: 1994, poster: '/assets/images/no_image.png' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery?.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with debouncing
    const filtered = mockSuggestions?.filter(movie =>
      movie?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    
    // Simulate network delay
    setTimeout(() => {
      setSuggestions(filtered);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setSelectedIndex(-1);

    // Clear previous debounce
    if (debounceRef?.current) {
      clearTimeout(debounceRef?.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      performSearch(query);
    }
  };

  const performSearch = (searchQuery) => {
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/movie-listings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (movie) => {
    setQuery(movie?.title);
    performSearch(movie?.title);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" 
          />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(true)}
            className="pl-10 pr-10 py-2 w-full bg-input border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} className="text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg elevation-2 z-200 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions?.map((movie, index) => (
              <button
                key={movie?.id}
                onClick={() => handleSuggestionClick(movie)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center space-x-3 ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
              >
                <div className="w-10 h-14 bg-muted rounded-sm flex-shrink-0 overflow-hidden">
                  <img
                    src={movie?.poster}
                    alt={movie?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-popover-foreground truncate">
                    {movie?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {movie?.year}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* No Results */}
      {showSuggestions && suggestions?.length === 0 && query && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg elevation-2 z-200">
          <div className="py-4 px-4 text-center">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No movies found for "{query}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;