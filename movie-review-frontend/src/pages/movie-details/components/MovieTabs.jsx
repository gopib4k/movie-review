import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MovieTabs = ({ cast, reviews, relatedMovies, onMovieClick }) => {
  const [activeTab, setActiveTab] = useState('cast');

  const tabs = [
    { id: 'cast', label: 'Cast & Crew', icon: 'Users', count: cast?.length },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare', count: reviews?.length },
    { id: 'related', label: 'Related Movies', icon: 'Film', count: relatedMovies?.length }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={`${
              star <= rating
                ? 'text-secondary fill-current' :'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderCastContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cast?.map((person) => (
        <div key={person?.id} className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
              <img
                src={person?.photo}
                alt={person?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-card-foreground truncate">
                {person?.name}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {person?.character}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviewsContent = () => (
    <div className="space-y-6">
      {reviews?.map((review) => (
        <div key={review?.id} className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {review?.user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">
                  {review?.user?.name}
                </h4>
                <div className="flex items-center space-x-2">
                  {renderStars(review?.rating)}
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            {review?.content}
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ThumbsUp" size={14} />
              <span>{review?.helpful}</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ThumbsDown" size={14} />
              <span>{review?.unhelpful}</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="MessageCircle" size={14} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRelatedContent = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {relatedMovies?.map((movie) => (
        <div
          key={movie?.id}
          onClick={() => onMovieClick(movie?.id)}
          className="bg-card rounded-lg overflow-hidden border border-border cursor-pointer hover:shadow-lg transition-all duration-200 floating-card"
        >
          <div className="aspect-[2/3] bg-muted">
            <img
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
          <div className="p-3">
            <h4 className="font-medium text-card-foreground text-sm truncate mb-1">
              {movie?.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {movie?.year}
              </span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-secondary" />
                <span className="text-xs text-muted-foreground">
                  {movie?.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                  {tab?.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'cast' && renderCastContent()}
        {activeTab === 'reviews' && renderReviewsContent()}
        {activeTab === 'related' && renderRelatedContent()}
      </div>
    </div>
  );
};

export default MovieTabs;