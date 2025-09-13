import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [editingReview, setEditingReview] = useState(null);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      movieId: 'tt0468569',
      movieTitle: 'The Dark Knight',
      moviePoster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
      rating: 5,
      reviewText: `Christopher Nolan's masterpiece redefined what a superhero movie could be. Heath Ledger's Joker is absolutely mesmerizing - a performance that will be remembered for decades. The film perfectly balances action, drama, and psychological thriller elements.\n\nThe cinematography is stunning, and Hans Zimmer's score elevates every scene. This isn't just a great superhero movie; it's a great movie, period.`,createdAt: '2024-12-10T15:30:00Z',updatedAt: '2024-12-10T15:30:00Z',
      helpfulVotes: 23,
      movieYear: 2008,
      movieGenres: ['Action', 'Crime', 'Drama']
    },
    {
      id: 2,
      movieId: 'tt1375666',movieTitle: 'Inception',moviePoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
      rating: 4,
      reviewText: `Nolan strikes again with this mind-bending thriller. The concept is brilliant and the execution is nearly flawless. The practical effects are incredible, especially the rotating hallway fight scene.\n\nWhile the plot can be confusing at times, it rewards multiple viewings. DiCaprio delivers another solid performance.`,
      createdAt: '2024-11-28T10:15:00Z',updatedAt: '2024-11-28T10:15:00Z',
      helpfulVotes: 18,
      movieYear: 2010,
      movieGenres: ['Action', 'Sci-Fi', 'Thriller']
    },
    {
      id: 3,
      movieId: 'tt0816692',movieTitle: 'Interstellar',moviePoster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop',
      rating: 4,
      reviewText: `A visually stunning space epic that tackles complex themes of love, sacrifice, and survival. McConaughey gives one of his best performances, and the supporting cast is excellent.\n\nThe scientific concepts are fascinating, though sometimes the emotional elements feel forced. Still, it's an ambitious and largely successful film.`,
      createdAt: '2024-11-15T14:45:00Z',
      updatedAt: '2024-11-15T14:45:00Z',
      helpfulVotes: 12,
      movieYear: 2014,
      movieGenres: ['Adventure', 'Drama', 'Sci-Fi']
    }
  ];

  useEffect(() => {
    // Simulate loading reviews
    setTimeout(() => {
      setReviews(mockReviews);
      setIsLoading(false);
    }, 1000);
  }, []);

  const sortedReviews = [...reviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'rating-high':
        return b?.rating - a?.rating;
      case 'rating-low':
        return a?.rating - b?.rating;
      case 'helpful':
        return b?.helpfulVotes - a?.helpfulVotes;
      default:
        return 0;
    }
  });

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev?.filter(review => review?.id !== reviewId));
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-4 z-300 px-4 py-2 bg-success text-success-foreground rounded-md shadow-lg';
      successMsg.textContent = 'Review deleted successfully!';
      document.body?.appendChild(successMsg);
      
      setTimeout(() => {
        if (document.body?.contains(successMsg)) {
          document.body?.removeChild(successMsg);
        }
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? "Star" : "Star"}
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-16 h-24 bg-muted rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">My Reviews</h2>
          <span className="text-sm text-muted-foreground">({reviews?.length})</span>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-muted-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {sortedReviews?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Reviews Yet</h3>
          <p className="text-muted-foreground mb-4">
            Start sharing your thoughts about movies you've watched
          </p>
          <Button variant="default" asChild>
            <Link to="/movie-listings">Browse Movies</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedReviews?.map((review) => (
            <div key={review?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex space-x-4">
                {/* Movie Poster */}
                <Link to={`/movie-details?id=${review?.movieId}`} className="flex-shrink-0">
                  <div className="w-16 h-24 rounded-md overflow-hidden">
                    <Image
                      src={review?.moviePoster}
                      alt={review?.movieTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </Link>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <Link 
                        to={`/movie-details?id=${review?.movieId}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {review?.movieTitle}
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-muted-foreground">{review?.movieYear}</span>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review?.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingReview(review?.id)}
                        iconName="Edit"
                        iconSize={14}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review?.id)}
                        iconName="Trash2"
                        iconSize={14}
                        className="text-error hover:text-error"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="text-sm text-foreground mb-3 whitespace-pre-line">
                    {review?.reviewText}
                  </div>

                  {/* Review Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Reviewed on {formatDate(review?.createdAt)}</span>
                      {review?.updatedAt !== review?.createdAt && (
                        <span>• Updated {formatDate(review?.updatedAt)}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{review?.helpfulVotes} found helpful</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewHistory;