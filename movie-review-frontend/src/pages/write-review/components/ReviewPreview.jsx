import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewPreview = ({ isOpen, onClose, reviewData, movie }) => {
  if (!isOpen) return null;

  const formatContent = (content) => {
    if (!content) return '';
    
    // Simple markdown-style formatting
    return content?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/\n/g, '<br/>');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}
            fill={star <= rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Review Preview</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Movie Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <img
              src={movie?.poster}
              alt={`${movie?.title} poster`}
              className="w-12 h-18 object-cover rounded"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div>
              <h3 className="font-semibold text-foreground">{movie?.title}</h3>
              <p className="text-sm text-muted-foreground">({movie?.year})</p>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-6">
            {/* Overall Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {renderStars(reviewData?.overallRating || 0)}
                <span className="text-lg font-semibold text-foreground">
                  {reviewData?.overallRating}/5
                </span>
              </div>
            </div>

            {/* Review Title */}
            {reviewData?.reviewTitle && (
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {reviewData?.reviewTitle}
                </h4>
              </div>
            )}

            {/* Spoiler Warning */}
            {reviewData?.containsSpoilers && (
              <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">
                  ⚠️ This review contains spoilers
                </span>
              </div>
            )}

            {/* Review Text */}
            <div className="prose prose-sm max-w-none">
              <div 
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(reviewData?.reviewContent) 
                }}
              />
            </div>

            {/* Detailed Ratings */}
            {Object.values(reviewData?.detailedRatings || {})?.some(rating => rating > 0) && (
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-4">Detailed Ratings</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(reviewData?.detailedRatings || {})?.map(([key, rating]) => {
                    if (!rating) return null;
                    
                    const labels = {
                      acting: 'Acting',
                      direction: 'Direction',
                      cinematography: 'Cinematography',
                      story: 'Story & Script'
                    };

                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {labels?.[key]}
                        </span>
                        <div className="flex items-center gap-2">
                          {renderStars(rating)}
                          <span className="text-sm font-medium">{rating}/5</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Review Info */}
            <div className="border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Review by John Doe</span>
                <span>{new Date()?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPreview;