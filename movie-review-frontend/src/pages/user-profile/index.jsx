import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import ProfileSettings from './components/ProfileSettings';
import ReviewHistory from './components/ReviewHistory';
import UserWatchlist from './components/UserWatchlist';
import AccountSettings from './components/AccountSettings';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock user data
  const mockUser = {
    id: 'user123',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: `Movie enthusiast and aspiring film critic. I love exploring different genres and discovering hidden gems. My reviews focus on storytelling, cinematography, and character development.\n\nAlways looking for recommendations, especially in the sci-fi and thriller genres!`,
    location: 'Los Angeles, CA',
    website: 'https://johnsmithreviews.com',
    joinDate: '2023-01-15T10:30:00Z',
    favoriteGenres: ['sci-fi', 'thriller', 'drama'],
    stats: {
      totalReviews: 47,
      averageRating: 4.2,
      watchlistCount: 23,
      helpfulVotes: 156
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: '/user-profile',
          message: 'Please sign in to access your profile' 
        }
      });
      return;
    }

    // Get tab from URL params
    const tab = searchParams?.get('tab');
    if (tab && ['profile', 'reviews', 'watchlist', 'settings']?.includes(tab)) {
      setActiveTab(tab);
    }

    // Load user data
    setTimeout(() => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser({ ...mockUser, ...parsedUser });
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(mockUser);
        }
      } else {
        setUser(mockUser);
        localStorage.setItem('userData', JSON.stringify(mockUser));
      }
      setIsLoading(false);
    }, 800);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate, searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const newUrl = tab === 'profile' ? '/user-profile' : `/user-profile?tab=${tab}`;
    window.history?.pushState({}, '', newUrl);
  };

  const handleEditProfile = () => {
    setActiveTab('profile');
    window.history?.pushState({}, '', '/user-profile');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSettings 
            user={user} 
            onSave={handleUserUpdate}
          />
        );
      case 'reviews':
        return <ReviewHistory />;
      case 'watchlist':
        return <UserWatchlist />;
      case 'settings':
        return <AccountSettings />;
      default:
        return (
          <ProfileSettings 
            user={user} 
            onSave={handleUserUpdate}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-muted rounded w-1/4"></div>
            
            {/* Profile header skeleton */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Tabs skeleton */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex space-x-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <div key={i} className="h-10 bg-muted rounded w-24"></div>
                ))}
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb />
        </div>

        {/* Profile Header */}
        <ProfileHeader 
          user={user} 
          onEditProfile={handleEditProfile}
        />

        {/* Profile Tabs */}
        <ProfileTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isMobile={isMobile}
        />

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {renderTabContent()}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} CineReview. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;