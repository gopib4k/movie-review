import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onEditProfile }) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleAvatarChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In real app, this would upload to server
        console.log('Avatar updated:', e?.target?.result);
        setIsEditingAvatar(false);
      };
      reader?.readAsDataURL(file);
    }
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()?.slice(0, 2);
    }
    return 'U';
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary flex items-center justify-center">
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                alt={user?.name || 'User Avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-primary-foreground">
                {getUserInitials()}
              </span>
            )}
          </div>
          
          {/* Avatar Edit Overlay */}
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
               onClick={() => setIsEditingAvatar(true)}>
            <Icon name="Camera" size={20} color="white" />
          </div>

          {/* Avatar Upload Input */}
          {isEditingAvatar && (
            <div className="absolute top-full left-0 mt-2 z-10">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="flex items-center space-x-2 px-3 py-2 bg-popover border border-border rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <Icon name="Upload" size={16} />
                <span className="text-sm">Upload Photo</span>
              </label>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {user?.name || 'User Name'}
              </h1>
              <p className="text-muted-foreground mb-2">
                {user?.email || 'user@example.com'}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Joined {formatJoinDate(user?.joinDate || '2023-01-15')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{user?.location || 'Location not set'}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={onEditProfile}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* User Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user?.stats?.totalReviews || 0}
            </div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user?.stats?.averageRating || '0.0'}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user?.stats?.watchlistCount || 0}
            </div>
            <div className="text-sm text-muted-foreground">Watchlist</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user?.stats?.helpfulVotes || 0}
            </div>
            <div className="text-sm text-muted-foreground">Helpful Votes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;