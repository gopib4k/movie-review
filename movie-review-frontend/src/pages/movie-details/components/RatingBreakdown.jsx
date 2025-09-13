import React from 'react';
import Icon from '../../../components/AppIcon';

const RatingBreakdown = ({ ratings, totalReviews }) => {
  const calculatePercentage = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const averageRating = totalReviews > 0 
    ? ratings?.reduce((sum, rating, index) => sum + (rating * (index + 1)), 0) / totalReviews
    : 0;

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">
        Rating Breakdown
      </h3>
      {/* Average Rating Display */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-foreground mb-2">
          {averageRating?.toFixed(1)}
        </div>
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Icon
              key={star}
              name="Star"
              size={20}
              className={`${
                star <= Math.round(averageRating)
                  ? 'text-secondary fill-current' :'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Based on {totalReviews?.toLocaleString()} reviews
        </p>
      </div>
      {/* Rating Distribution */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1]?.map((starCount) => {
          const count = ratings?.[starCount - 1] || 0;
          const percentage = calculatePercentage(count);
          
          return (
            <div key={starCount} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-sm font-medium text-foreground">
                  {starCount}
                </span>
                <Icon name="Star" size={14} className="text-secondary" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-300 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 text-right">
                <span className="text-sm text-muted-foreground">
                  {count?.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Rating Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {((ratings?.[4] + ratings?.[3]) / totalReviews * 100)?.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Positive (4-5 stars)
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {(ratings?.[0] / totalReviews * 100)?.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Critical (1 star)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;