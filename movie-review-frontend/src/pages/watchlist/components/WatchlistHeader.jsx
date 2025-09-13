import React from 'react';
import Icon from '../../../components/AppIcon';

const WatchlistHeader = ({ totalMovies = 0, watchedCount = 0, priorityCount = 0 }) => {
  const unwatchedCount = totalMovies - watchedCount;

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Watchlist</h1>
          <p className="text-muted-foreground">
            Keep track of movies you want to watch and organize your viewing experience
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.href = '/movie-listings'}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={16} />
            Add Movies
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {totalMovies > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Film" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalMovies}</p>
                <p className="text-sm text-muted-foreground">Total Movies</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{watchedCount}</p>
                <p className="text-sm text-muted-foreground">Watched</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="Clock" size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{unwatchedCount}</p>
                <p className="text-sm text-muted-foreground">To Watch</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Icon name="Star" size={20} className="text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{priorityCount}</p>
                <p className="text-sm text-muted-foreground">Priority</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistHeader;