import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'Star',
      title: 'Rate & Review Movies',
      description: 'Share your opinions and help others discover great films',
      color: 'text-secondary'
    },
    {
      icon: 'Bookmark',
      title: 'Personal Watchlist',
      description: 'Keep track of movies you want to watch',
      color: 'text-accent'
    },
    {
      icon: 'Users',
      title: 'Join the Community',
      description: 'Connect with fellow movie enthusiasts',
      color: 'text-primary'
    },
    {
      icon: 'TrendingUp',
      title: 'Discover Trending Films',
      description: 'Stay updated with the latest and most popular movies',
      color: 'text-success'
    },
    {
      icon: 'Search',
      title: 'Advanced Search',
      description: 'Find movies by genre, year, rating, and more',
      color: 'text-warning'
    },
    {
      icon: 'Bell',
      title: 'Personalized Recommendations',
      description: 'Get movie suggestions based on your preferences',
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="Sparkles" size={24} color="white" />
        </div>
        <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
          Why Join CineReview?
        </h3>
        <p className="text-sm text-muted-foreground">
          Unlock the full movie discovery experience
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {benefits?.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center flex-shrink-0 border border-border">
              <Icon name={benefit?.icon} size={16} className={benefit?.color} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-card-foreground mb-1">
                {benefit?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-md border border-primary/10">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Gift" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            Free Forever
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          All features are completely free. No hidden fees, no premium subscriptions. 
          Just pure movie discovery and community engagement.
        </p>
      </div>
    </div>
  );
};

export default BenefitsSection;