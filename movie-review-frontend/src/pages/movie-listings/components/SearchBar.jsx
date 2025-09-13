import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  onSearch, 
  initialQuery = '', 
  placeholder = 'Search movies by title, actor, or director...', 
  className = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, title: 'The Dark Knight', type: 'movie', year: 2008 },
    { id: 2, title: 'Christopher Nolan', type: 'director', count: 12 },
    { id: 3, title: 'Christian Bale', type: 'actor', count: 24 },
    { id: 4, title: 'Inception', type: 'movie', year: 2010 },
    { id: 5, title: 'Interstellar', type: 'movie', year: 2014 },
    { id: 6, title: 'Heath Ledger', type: 'actor', count: 18 },
    { id: 7, title: 'Batman Begins', type: 'movie', year: 2005 },
    { id: 8, title: 'The Prestige', type: 'movie', year: 2006 }
  ];

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
    
    // Simulate API call with filtering
    const filtered = mockSuggestions?.filter(item =>
      item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    
    // Simulate network delay
    setTimeout(() => {
      setSuggestions(filtered?.slice(0, 6)); // Limit to 6 suggestions
      setShowSuggestions(true);
      setIsLoading(false);
    }, 200);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setSelectedIndex(-1);

    // Clear previous debounce
    if (debounceRef?.current) {
      clearTimeout(debounceRef?.current);
    }

    // Debounce search suggestions
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
    onSearch(searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.title);
    performSearch(suggestion?.title);
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
    onSearch('');
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'movie': return 'Film';
      case 'actor': return 'User';
      case 'director': return 'Camera';
      default: return 'Search';
    }
  };

  const getSuggestionLabel = (suggestion) => {
    switch (suggestion?.type) {
      case 'movie':
        return `${suggestion?.title} (${suggestion?.year})`;
      case 'actor': case'director':
        return `${suggestion?.title} • ${suggestion?.count} movies`;
      default:
        return suggestion?.title;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" 
          />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(true)}
            className="pl-12 pr-12 py-3 w-full bg-input border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
            </div>
          )}
          
          {/* Clear Button */}
          {query && !isLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 hover:bg-muted"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg elevation-3 z-200 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center space-x-3 ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
              >
                <Icon 
                  name={getSuggestionIcon(suggestion?.type)} 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-popover-foreground truncate">
                    {getSuggestionLabel(suggestion)}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {suggestion?.type}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={12} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* No Results */}
      {showSuggestions && suggestions?.length === 0 && query && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg elevation-2 z-200">
          <div className="py-6 px-4 text-center">
            <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-popover-foreground mb-1">
              No results found
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}
      {/* Recent Searches (when input is focused but empty) */}
      {showSuggestions && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg elevation-2 z-200">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Popular Searches
              </p>
            </div>
            {mockSuggestions?.slice(0, 4)?.map((suggestion, index) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center space-x-3"
              >
                <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                <span className="text-sm text-popover-foreground">
                  {suggestion?.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;