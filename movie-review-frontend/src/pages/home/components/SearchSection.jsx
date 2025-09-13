import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import SearchBar from '../../../components/ui/SearchBar';

const SearchSection = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query?.trim()) {
      navigate(`/movie-listings?search=${encodeURIComponent(query)}`);
    }
  };

  const popularSearches = [
    "Action Movies",
    "Comedy Films",
    "Marvel Movies",
    "Christopher Nolan",
    "2024 Movies",
    "Sci-Fi Thriller"
  ];

  const quickFilters = [
    { label: "Trending Now", icon: "TrendingUp", link: "/movie-listings?filter=trending" },
    { label: "Top Rated", icon: "Star", link: "/movie-listings?filter=top-rated" },
    { label: "New Releases", icon: "Calendar", link: "/movie-listings?filter=new" },
    { label: "Coming Soon", icon: "Clock", link: "/movie-listings?filter=upcoming" }
  ];

  return (
    <section className={`py-12 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Your Next Favorite Movie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search through thousands of movies, read reviews, and find your perfect watch for tonight
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <SearchBar
                placeholder="Search for movies, actors, directors..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Filters
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {quickFilters?.map((filter) => (
                <Button
                  key={filter?.label}
                  variant="outline"
                  size="sm"
                  iconName={filter?.icon}
                  iconPosition="left"
                  onClick={() => navigate(filter?.link)}
                  className="flex-shrink-0"
                >
                  {filter?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Popular Searches
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches?.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1 bg-background border border-border rounded-full text-sm text-foreground hover:bg-muted transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">1M+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">100K+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Daily</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;