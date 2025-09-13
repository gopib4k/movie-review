import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterSort = ({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortByChange, 
  sortOrder, 
  onSortOrderChange, 
  resultCount 
}) => {
  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Genre Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Genre:</label>
          <select
            value={filters?.genre}
            onChange={(e) => handleFilterChange('genre', e?.target?.value)}
            className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Genres</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="horror">Horror</option>
            <option value="crime">Crime</option>
          </select>
        </div>

        {/* Decade Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Decade:</label>
          <select
            value={filters?.decade}
            onChange={(e) => handleFilterChange('decade', e?.target?.value)}
            className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Years</option>
            <option value="2020">2020s</option>
            <option value="2010">2010s</option>
            <option value="2000">2000s</option>
            <option value="1990">1990s</option>
            <option value="1980">1980s</option>
            <option value="1970">1970s</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Rating:</label>
          <select
            value={filters?.rating}
            onChange={(e) => handleFilterChange('rating', e?.target?.value)}
            className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        {/* Watched Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Status:</label>
          <select
            value={filters?.watched}
            onChange={(e) => handleFilterChange('watched', e?.target?.value)}
            className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Movies</option>
            <option value="watched">Watched</option>
            <option value="unwatched">Not Watched</option>
          </select>
        </div>
      </div>
      {/* Sort and Results Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-foreground">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e?.target?.value)}
              className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="dateAdded">Date Added</option>
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <Icon 
              name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
              size={14} 
            />
            <span>{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {resultCount} {resultCount === 1 ? 'movie' : 'movies'}
        </div>
      </div>
      {/* Active Filters Summary */}
      {(filters?.genre !== 'all' || filters?.decade !== 'all' || filters?.rating !== 'all' || filters?.watched !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.genre !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Genre: {filters?.genre}
            </span>
          )}
          {filters?.decade !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters?.decade}s
            </span>
          )}
          {filters?.rating !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters?.rating}+ Stars
            </span>
          )}
          {filters?.watched !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters?.watched === 'watched' ? 'Watched' : 'Not Watched'}
            </span>
          )}
          <button
            onClick={() => onFiltersChange({
              genre: 'all',
              decade: 'all',
              rating: 'all',
              watched: 'all'
            })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSort;