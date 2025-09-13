import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Bookmark" size={48} className="text-muted-foreground" />
          </div>
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Your Watchlist is Empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Start building your movie collection! Browse our library and save movies you want to watch later.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/movie-listings')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Icon name="Search" size={20} />
            Browse Movies
          </button>
          
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Icon name="TrendingUp" size={20} />
            Discover Trending
          </button>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-foreground mb-3">💡 Pro Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground text-left">
            <div className="flex items-start gap-2">
              <Icon name="Star" size={14} className="text-warning mt-0.5 flex-shrink-0" />
              <span>Mark movies as priority to watch them first</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>Track which movies you've already watched</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Edit3" size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Write reviews after watching to remember your thoughts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;