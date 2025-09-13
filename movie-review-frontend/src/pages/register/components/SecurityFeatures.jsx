import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Registration',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: 'Mail',
      title: 'Email Verification',
      description: 'We verify your email to ensure account security'
    },
    {
      icon: 'Lock',
      title: 'Password Protection',
      description: 'Strong password requirements keep your account safe'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'We never share your personal information with third parties'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="text-lg font-heading font-semibold text-card-foreground">
          Your Security Matters
        </h3>
      </div>
      <div className="space-y-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={feature?.icon} size={14} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-3 bg-accent/10 rounded-md border border-accent/20">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-xs text-accent font-medium mb-1">
              Account Verification Required
            </p>
            <p className="text-xs text-muted-foreground">
              After registration, check your email for a verification link to activate your account and start reviewing movies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;