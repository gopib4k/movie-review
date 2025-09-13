import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Advanced authentication and session management'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-center mb-3">
          <Icon name="ShieldCheck" size={20} className="text-success mr-2" />
          <h3 className="text-sm font-medium text-foreground">
            Your Security Matters
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={12} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">
                  {feature?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>4.8 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={12} />
              <span>Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;