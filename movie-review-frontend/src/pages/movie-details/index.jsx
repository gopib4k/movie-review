import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MovieHero from './components/MovieHero';
import MovieTabs from './components/MovieTabs';
import TrailerModal from './components/TrailerModal';
import RatingModal from './components/RatingModal';
import ReviewModal from './components/ReviewModal';
import RatingBreakdown from './components/RatingBreakdown';
import Icon from '../../components/AppIcon';

const MovieDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = searchParams?.get('id');
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock movie data
  const mockMovieData = {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    runtime: 152,
    rating: 4.5,
    reviewCount: 2847,
    poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=1200&h=600&fit=crop",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    director: "Christopher Nolan",
    synopsis: `When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.`,
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    cast: [
      { id: 1, name: "Christian Bale", character: "Bruce Wayne / Batman", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
      { id: 2, name: "Heath Ledger", character: "The Joker", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
      { id: 3, name: "Aaron Eckhart", character: "Harvey Dent / Two-Face", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      { id: 4, name: "Michael Caine", character: "Alfred Pennyworth", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
      { id: 5, name: "Maggie Gyllenhaal", character: "Rachel Dawes", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
      { id: 6, name: "Gary Oldman", character: "Lt. James Gordon", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face" }
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
        rating: 5,
        date: "2025-01-10T10:30:00Z",
        content: `The Dark Knight is a masterpiece that transcends the superhero genre. Heath Ledger's portrayal of the Joker is absolutely phenomenal - haunting, unpredictable, and utterly captivating. Christian Bale delivers another solid performance as Batman, but it's really Ledger who steals every scene he's in.\n\nChristopher Nolan's direction is impeccable, creating a dark and gritty Gotham that feels real and lived-in. The action sequences are expertly choreographed, and the film's exploration of chaos versus order is both thought-provoking and entertaining.`,
        helpful: 156,
        unhelpful: 8
      },
      {
        id: 2,
        user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
        rating: 4,
        date: "2025-01-08T15:45:00Z",
        content: `An exceptional sequel that raises the bar for superhero films. The Dark Knight successfully balances spectacular action with deep character development and moral complexity. Heath Ledger's final performance is legendary - he completely disappears into the role of the Joker.\n\nThe film's themes of sacrifice, corruption, and the thin line between heroism and vigilantism are handled with remarkable maturity. While it can be quite dark and intense, it never loses sight of its entertainment value.`,
        helpful: 89,
        unhelpful: 12
      },
      {
        id: 3,
        user: { name: "Mike Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
        rating: 5,
        date: "2025-01-05T20:15:00Z",
        content: `Simply put, this is one of the greatest films ever made, superhero or otherwise. Every element works in perfect harmony - the performances, direction, cinematography, score, and writing all come together to create something truly special.\n\nThe Joker's chaos agent philosophy creates genuine tension and unpredictability. The moral dilemmas faced by the characters feel real and consequential. This isn't just a comic book movie; it's a crime epic that happens to feature Batman.`,
        helpful: 203,
        unhelpful: 5
      }
    ],
    relatedMovies: [
      { id: 2, title: "Batman Begins", year: 2005, rating: 4.2, poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop" },
      { id: 3, title: "The Dark Knight Rises", year: 2012, rating: 4.1, poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=300&h=450&fit=crop" },
      { id: 4, title: "Joker", year: 2019, rating: 4.3, poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop" },
      { id: 5, title: "Inception", year: 2010, rating: 4.4, poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop" },
      { id: 6, title: "Interstellar", year: 2014, rating: 4.3, poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop" }
    ],
    ratingBreakdown: [45, 89, 234, 876, 1603] // [1-star, 2-star, 3-star, 4-star, 5-star]
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError('Movie ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovie(mockMovieData);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handlePlayTrailer = () => {
    setShowTrailer(true);
  };

  const handleRateMovie = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: `/movie-details?id=${movieId}`,
          message: 'Please sign in to rate this movie' 
        }
      });
      return;
    }
    setShowRatingModal(true);
  };

  const handleWriteReview = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: `/movie-details?id=${movieId}`,
          message: 'Please sign in to write a review' 
        }
      });
      return;
    }
    setShowReviewModal(true);
  };

  const handleSubmitRating = async (ratingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Rating submitted:', ratingData);
      
      // Show success feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = 'Rating submitted successfully!';
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Review submitted:', reviewData);
      
      // Show success feedback
      const feedback = document.createElement('div');
      feedback.className = 'fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium bg-success text-success-foreground';
      feedback.textContent = 'Review published successfully!';
      document.body?.appendChild(feedback);
      
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleMovieClick = (relatedMovieId) => {
    navigate(`/movie-details?id=${relatedMovieId}`);
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
              Movie Not Found
            </h2>
            <p className="text-muted-foreground">
              {error || 'The requested movie could not be found.'}
            </p>
            <button
              onClick={() => navigate('/movie-listings')}
              className="text-primary hover:underline"
            >
              Browse all movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/home', icon: 'Home' },
    { label: 'Movies', path: '/movie-listings', icon: 'Film' },
    { label: movie?.title, path: `/movie-details?id=${movie?.id}`, icon: 'Info' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{movie?.title} ({movie?.year}) - Movie Details | CineReview</title>
        <meta name="description" content={`${movie?.synopsis?.substring(0, 160)}...`} />
        <meta property="og:title" content={`${movie?.title} (${movie?.year}) - CineReview`} />
        <meta property="og:description" content={movie?.synopsis} />
        <meta property="og:image" content={movie?.poster} />
        <meta property="og:type" content="video.movie" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      {/* Movie Hero Section */}
      <MovieHero
        movie={movie}
        onPlayTrailer={handlePlayTrailer}
        onRateMovie={handleRateMovie}
        onWriteReview={handleWriteReview}
      />
      {/* Rating Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <RatingBreakdown
              ratings={movie?.ratingBreakdown}
              totalReviews={movie?.reviewCount}
            />
          </div>
          <div className="lg:col-span-3">
            {/* Tabs Section */}
            <MovieTabs
              cast={movie?.cast}
              reviews={movie?.reviews}
              relatedMovies={movie?.relatedMovies}
              onMovieClick={handleMovieClick}
            />
          </div>
        </div>
      </div>
      {/* Modals */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerUrl={movie?.trailerUrl}
        movieTitle={movie?.title}
      />
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
        movieTitle={movie?.title}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        movieTitle={movie?.title}
      />
    </div>
  );
};

export default MovieDetailsPage;