import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBenefits = () => {
  const benefits = [
    {
      icon: 'MessageSquare',
      title: 'Write Reviews',
      description: 'Share your thoughts and rate movies you\'ve watched'
    },
    {
      icon: 'Bookmark',
      title: 'Personal Watchlist',
      description: 'Save movies to watch later and track your viewing progress'
    },
    {
      icon: 'Users',
      title: 'Join Community',
      description: 'Connect with fellow movie enthusiasts and discover new films'
    },
    {
      icon: 'TrendingUp',
      title: 'Personalized Recommendations',
      description: 'Get movie suggestions based on your ratings and preferences'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          Why Join CineReview?
        </h2>
        <p className="text-sm text-muted-foreground">
          Unlock the full movie discovery experience
        </p>
      </div>
      <div className="space-y-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1">
                {benefit?.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            Free Forever
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          All features are completely free. No hidden fees, no premium tiers. 
          Just pure movie discovery and community engagement.
        </p>
      </div>
    </div>
  );
};

export default LoginBenefits;