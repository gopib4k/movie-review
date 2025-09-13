import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileTabs = ({ activeTab, onTabChange, isMobile = false }) => {
  const tabs = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      description: 'Manage your account information'
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      icon: 'MessageSquare',
      description: 'View and edit your movie reviews'
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      icon: 'Bookmark',
      description: 'Movies you want to watch'
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'Settings',
      description: 'Privacy and notification preferences'
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-2 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border text-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={tab?.icon} size={20} />
              <div className="text-left">
                <div className="font-medium">{tab?.label}</div>
                <div className="text-sm text-muted-foreground">{tab?.description}</div>
              </div>
            </div>
            <Icon 
              name={activeTab === tab?.id ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-1 mb-6">
      <div className="flex space-x-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 ${
              activeTab === tab?.id ? '' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;