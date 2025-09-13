import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReviewModal = ({ isOpen, onClose, onSubmit, movieTitle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0 || !title?.trim() || !review?.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        title: title?.trim(),
        review: review?.trim()
      });
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setTitle('');
    setReview('');
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

  const isFormValid = rating > 0 && title?.trim()?.length > 0 && review?.trim()?.length >= 50;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl mx-4 bg-background rounded-lg shadow-2xl elevation-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Write a Review
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
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
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
                      size={28}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-secondary fill-current' :'text-muted-foreground hover:text-secondary/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(hoverRating || rating) > 0 && (
                <span className="text-lg font-medium text-foreground">
                  {getRatingText(hoverRating || rating)}
                </span>
              )}
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Input
              label="Review Title *"
              type="text"
              value={title}
              onChange={(e) => setTitle(e?.target?.value)}
              placeholder="Summarize your review in a few words"
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {title?.length}/100 characters
            </p>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Your Review *
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e?.target?.value)}
              placeholder={`Share your detailed thoughts about ${movieTitle}. What did you like or dislike? Would you recommend it to others?`}
              className="w-full h-32 px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={2000}
              required
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimum 50 characters required</span>
              <span>{review?.length}/2000 characters</span>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Review Guidelines
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be respectful and constructive in your feedback</li>
              <li>• Avoid spoilers or mark them clearly</li>
              <li>• Focus on the movie's content, not personal attacks</li>
              <li>• Share specific examples to support your opinion</li>
            </ul>
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
              disabled={!isFormValid || isSubmitting}
              loading={isSubmitting}
            >
              Publish Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;