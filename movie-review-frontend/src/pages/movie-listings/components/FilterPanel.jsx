import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  resultsCount = 0,
  isLoading = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const genreOptions = [
    { value: '', label: 'All Genres' },
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'animation', label: 'Animation' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'crime', label: 'Crime' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'drama', label: 'Drama' },
    { value: 'family', label: 'Family' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'history', label: 'History' },
    { value: 'horror', label: 'Horror' },
    { value: 'music', label: 'Music' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
    { value: 'science-fiction', label: 'Science Fiction' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'war', label: 'War' },
    { value: 'western', label: 'Western' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'release_date', label: 'Latest Release' },
    { value: 'title', label: 'A-Z' },
    { value: 'year', label: 'Year' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '9', label: '9+ Stars' },
    { value: '8', label: '8+ Stars' },
    { value: '7', label: '7+ Stars' },
    { value: '6', label: '6+ Stars' },
    { value: '5', label: '5+ Stars' }
  ];

  const currentYear = new Date()?.getFullYear();
  const yearOptions = [
    { value: '', label: 'Any Year' },
    { value: currentYear?.toString(), label: currentYear?.toString() },
    { value: (currentYear - 1)?.toString(), label: (currentYear - 1)?.toString() },
    { value: '2020-2024', label: '2020-2024' },
    { value: '2010-2019', label: '2010-2019' },
    { value: '2000-2009', label: '2000-2009' },
    { value: '1990-1999', label: '1990s' },
    { value: '1980-1989', label: '1980s' },
    { value: '1970-1979', label: '1970s' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      genre: '',
      year: '',
      rating: '',
      sortBy: 'popularity'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = localFilters?.genre || localFilters?.year || localFilters?.rating || localFilters?.sortBy !== 'popularity';

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <Icon name="Loader2" size={14} className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <span>{resultsCount?.toLocaleString()} movies found</span>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Genre"
          options={genreOptions}
          value={localFilters?.genre}
          onChange={(value) => handleFilterChange('genre', value)}
          placeholder="Select genre"
        />

        <Select
          label="Year"
          options={yearOptions}
          value={localFilters?.year}
          onChange={(value) => handleFilterChange('year', value)}
          placeholder="Select year"
        />

        <Select
          label="Rating"
          options={ratingOptions}
          value={localFilters?.rating}
          onChange={(value) => handleFilterChange('rating', value)}
          placeholder="Minimum rating"
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={localFilters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden md:block bg-card border border-border rounded-lg p-6 mb-6">
        <FilterContent />
      </div>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Filters {hasActiveFilters && `(${Object.values(localFilters)?.filter(v => v && v !== 'popularity')?.length})`}
        </Button>
      </div>
      {/* Mobile Filter Slide Panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-300 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Filter Movies</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  iconName="X"
                  iconSize={20}
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Button
                  variant="default"
                  onClick={onToggle}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;