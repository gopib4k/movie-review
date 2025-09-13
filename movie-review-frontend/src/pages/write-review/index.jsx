import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MovieInfo from './components/MovieInfo';
import RatingSelector from './components/RatingSelector';
import ReviewEditor from './components/ReviewEditor';
import DetailedRatings from './components/DetailedRatings';
import ReviewPreview from './components/ReviewPreview';
import Icon from '../../components/AppIcon';

const WriteReviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = searchParams?.get('movieId') || searchParams?.get('id');
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Review form state
  const [reviewData, setReviewData] = useState({
    overallRating: 0,
    reviewTitle: '',
    reviewContent: '',
    detailedRatings: {
      acting: 0,
      direction: 0,
      cinematography: 0,
      story: 0
    },
    containsSpoilers: false,
    isDraft: false
  });

  // Mock movie data for demo
  const mockMovieData = {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    runtime: 152,
    rating: 4.5,
    poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=400&h=600&fit=crop",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    director: "Christopher Nolan"
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: `/write-review?movieId=${movieId}`,
          message: 'Please sign in to write a review' 
        }
      });
      return;
    }

    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError('Movie ID is required to write a review');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setMovie(mockMovieData);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, navigate]);

  const handleReviewChange = (field, value) => {
    setReviewData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDetailedRatingChange = (category, rating) => {
    setReviewData(prev => ({
      ...prev,
      detailedRatings: {
        ...prev?.detailedRatings,
        [category]: rating
      }
    }));
  };

  const handleSaveDraft = async () => {
    try {
      const draftData = { ...reviewData, isDraft: true };
      console.log('Saving draft:', draftData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = 'Draft saved successfully!';
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      // Validation
      if (!reviewData?.overallRating) {
        alert('Please provide an overall rating');
        return;
      }
      if (!reviewData?.reviewContent?.trim()) {
        alert('Please write your review');
        return;
      }
      if (reviewData?.reviewContent?.length < 50) {
        alert('Review must be at least 50 characters long');
        return;
      }

      const submissionData = { ...reviewData, isDraft: false };
      console.log('Submitting review:', submissionData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success and redirect
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = 'Review published successfully!';
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        navigate(`/movie-details?id=${movieId}`);
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const isFormValid = () => {
    return reviewData?.overallRating > 0 && 
           reviewData?.reviewContent?.trim()?.length >= 50;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={48} className="text-primary" />
            </div>
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">
              Unable to Load Movie
            </h2>
            <p className="text-muted-foreground">
              {error || 'Please try selecting a movie again.'}
            </p>
            <button
              onClick={() => navigate('/movie-listings')}
              className="text-primary hover:underline"
            >
              Browse movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/home', icon: 'Home' },
    { label: 'Movies', path: '/movie-listings', icon: 'Film' },
    { label: movie?.title, path: `/movie-details?id=${movie?.id}`, icon: 'Info' },
    { label: 'Write Review', path: `/write-review?movieId=${movie?.id}`, icon: 'Edit3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Write Review - {movie?.title} ({movie?.year}) | CineReview</title>
        <meta name="description" content={`Write a detailed review for ${movie?.title} (${movie?.year})`} />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Write Review</h1>
          <p className="text-muted-foreground">Share your thoughts and help others discover great movies</p>
        </div>

        <div className="space-y-8">
          {/* Movie Information */}
          <MovieInfo movie={movie} />

          {/* Overall Rating */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Overall Rating</h2>
            <RatingSelector
              rating={reviewData?.overallRating}
              onRatingChange={(rating) => handleReviewChange('overallRating', rating)}
              showLabel={true}
            />
          </div>

          {/* Review Title */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Review Title</h2>
            <input
              type="text"
              placeholder="Summarize your review in a few words..."
              value={reviewData?.reviewTitle}
              onChange={(e) => handleReviewChange('reviewTitle', e?.target?.value)}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {reviewData?.reviewTitle?.length || 0}/100 characters
            </p>
          </div>

          {/* Review Content */}
          <ReviewEditor
            content={reviewData?.reviewContent}
            onContentChange={(content) => handleReviewChange('reviewContent', content)}
            containsSpoilers={reviewData?.containsSpoilers}
            onSpoilerToggle={(value) => handleReviewChange('containsSpoilers', value)}
          />

          {/* Detailed Ratings */}
          <DetailedRatings
            ratings={reviewData?.detailedRatings}
            onRatingChange={handleDetailedRatingChange}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-border">
            <button
              onClick={() => setShowPreview(true)}
              disabled={!reviewData?.reviewContent?.trim()}
              className="px-6 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </button>
            
            <button
              onClick={handleSaveDraft}
              disabled={!reviewData?.reviewContent?.trim()}
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Save Draft
            </button>

            <button
              onClick={handleSubmitReview}
              disabled={!isFormValid()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Publish Review
            </button>
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      <ReviewPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        reviewData={reviewData}
        movie={movie}
      />
    </div>
  );
};

export default WriteReviewPage;