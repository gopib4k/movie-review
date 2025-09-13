import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RatingModal = ({ isOpen, onClose, onSubmit, movieTitle, existingRating = null }) => {
  const [rating, setRating] = useState(existingRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, review: review?.trim() });
      onClose();
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const getRatingText = (ratingValue) => {
    const texts = {
      1: 'Terrible',
      2: 'Poor',
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    };
    return texts?.[ratingValue] || '';
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 bg-background rounded-lg shadow-2xl elevation-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Rate Movie
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {movieTitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-secondary fill-current' :'text-muted-foreground hover:text-secondary/50'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <div className="h-6">
              {(hoverRating || rating) > 0 && (
                <p className="text-lg font-medium text-foreground">
                  {getRatingText(hoverRating || rating)}
                </p>
              )}
            </div>
          </div>

          {/* Optional Review */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Add a review (optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e?.target?.value)}
              placeholder="Share your thoughts about this movie..."
              className="w-full h-24 px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {review?.length}/500 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              disabled={rating === 0 || isSubmitting}
              loading={isSubmitting}
            >
              {existingRating ? 'Update Rating' : 'Submit Rating'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;