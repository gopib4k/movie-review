import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import SearchSection from './components/SearchSection';
import MovieSection from './components/MovieSection';
import TrendingSection from './components/TrendingSection';

const HomePage = () => {
  // Mock data for different movie sections
  const trendingMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      year: 2024,
      rating: 8.5,
      genre: "Sci-Fi, Adventure",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      duration: "166 min",
      viewCount: 15420,
      reviewCount: 342,
      isNew: true
    },
    {
      id: 2,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.3,
      genre: "Biography, Drama",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      duration: "180 min",
      viewCount: 12890,
      reviewCount: 287
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      year: 2023,
      rating: 8.7,
      genre: "Animation, Action",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      duration: "140 min",
      viewCount: 11250,
      reviewCount: 198
    },
    {
      id: 4,
      title: "The Batman",
      year: 2022,
      rating: 7.8,
      genre: "Action, Crime",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      duration: "176 min",
      viewCount: 9870,
      reviewCount: 156
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      year: 2022,
      rating: 8.2,
      genre: "Action, Drama",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      duration: "130 min",
      viewCount: 8940,
      reviewCount: 203
    },
    {
      id: 6,
      title: "Everything Everywhere All at Once",
      year: 2022,
      rating: 7.8,
      genre: "Action, Adventure",
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      duration: "139 min",
      viewCount: 7650,
      reviewCount: 189
    }
  ];

  const recentlyReviewed = [
    {
      id: 7,
      title: "Barbie",
      year: 2023,
      rating: 7.2,
      genre: "Comedy, Fantasy",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      duration: "114 min",
      viewCount: 25420,
      reviewCount: 542
    },
    {
      id: 8,
      title: "John Wick: Chapter 4",
      year: 2023,
      rating: 7.7,
      genre: "Action, Crime",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      duration: "169 min",
      viewCount: 18930,
      reviewCount: 398
    },
    {
      id: 9,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.6,
      genre: "Action, Adventure",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      duration: "192 min",
      viewCount: 45230,
      reviewCount: 892
    },
    {
      id: 10,
      title: "Black Panther: Wakanda Forever",
      year: 2022,
      rating: 6.7,
      genre: "Action, Adventure",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      duration: "161 min",
      viewCount: 32100,
      reviewCount: 567
    },
    {
      id: 11,
      title: "The Menu",
      year: 2022,
      rating: 7.2,
      genre: "Comedy, Horror",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      duration: "107 min",
      viewCount: 12450,
      reviewCount: 234
    }
  ];

  const recommendedMovies = [
    {
      id: 12,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      genre: "Action, Sci-Fi",
      poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
      duration: "148 min",
      viewCount: 89340,
      reviewCount: 1234
    },
    {
      id: 13,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      genre: "Action, Crime",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      duration: "152 min",
      viewCount: 156780,
      reviewCount: 2341
    },
    {
      id: 14,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      genre: "Adventure, Drama",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      duration: "169 min",
      viewCount: 78920,
      reviewCount: 987
    },
    {
      id: 15,
      title: "Pulp Fiction",
      year: 1994,
      rating: 8.9,
      genre: "Crime, Drama",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      duration: "154 min",
      viewCount: 134560,
      reviewCount: 1876
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>CineReview - Discover Movies, Read Reviews, Share Your Opinion</title>
        <meta 
          name="description" 
          content="Discover the latest movies, read authentic reviews, and share your opinions. Join thousands of movie enthusiasts on CineReview - your ultimate movie discovery platform." 
        />
        <meta name="keywords" content="movies, reviews, ratings, cinema, film, entertainment, movie database" />
        <meta property="og:title" content="CineReview - Your Ultimate Movie Discovery Platform" />
        <meta property="og:description" content="Discover movies, read reviews, and share your opinions with fellow movie enthusiasts." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/home" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-4 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <HeroCarousel />
            </div>
          </section>

          {/* Search Section */}
          <SearchSection />

          {/* Trending Movies Section */}
          <MovieSection
            title="Trending Now"
            movies={trendingMovies}
            viewAllLink="/movie-listings?filter=trending"
            cardSize="default"
            className="bg-background"
          />

          {/* Trending Details Section */}
          <TrendingSection className="bg-muted/20" />

          {/* Recently Reviewed Section */}
          <MovieSection
            title="Recently Reviewed"
            movies={recentlyReviewed}
            viewAllLink="/movie-listings?filter=recent-reviews"
            cardSize="default"
            className="bg-background"
          />

          {/* Recommended Section */}
          <MovieSection
            title="Recommended for You"
            movies={recommendedMovies}
            viewAllLink="/movie-listings?filter=recommended"
            cardSize="large"
            className="bg-muted/20"
          />

          {/* Call to Action Section */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join the CineReview Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Share your movie opinions, discover hidden gems, and connect with fellow film enthusiasts. 
                Your next favorite movie is just a review away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/register'}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Reviewing Movies
                </button>
                <button
                  onClick={() => window.location.href = '/movie-listings'}
                  className="px-8 py-3 bg-transparent border border-border text-foreground rounded-md font-medium hover:bg-muted transition-colors"
                >
                  Browse All Movies
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">CR</span>
                  </div>
                  <span className="font-bold text-xl text-card-foreground">CineReview</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Your ultimate destination for movie discovery, reviews, and recommendations. 
                  Join thousands of movie enthusiasts sharing their passion for cinema.
                </p>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-5 h-5 bg-muted-foreground rounded-sm"></div>
                  </button>
                  <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-5 h-5 bg-muted-foreground rounded-sm"></div>
                  </button>
                  <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="w-5 h-5 bg-muted-foreground rounded-sm"></div>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-4">Discover</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="/movie-listings" className="hover:text-foreground transition-colors">Browse Movies</a></li>
                  <li><a href="/movie-listings?filter=trending" className="hover:text-foreground transition-colors">Trending</a></li>
                  <li><a href="/movie-listings?filter=top-rated" className="hover:text-foreground transition-colors">Top Rated</a></li>
                  <li><a href="/movie-listings?filter=new" className="hover:text-foreground transition-colors">New Releases</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-4">Community</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="/register" className="hover:text-foreground transition-colors">Join Us</a></li>
                  <li><a href="/user-profile" className="hover:text-foreground transition-colors">My Profile</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date()?.getFullYear()} CineReview. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;