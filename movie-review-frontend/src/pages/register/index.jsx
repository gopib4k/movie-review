import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';
import BenefitsSection from './components/BenefitsSection';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
                <RegistrationForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits Section */}
              <BenefitsSection />
              
              {/* Security Features */}
              <SecurityFeatures />
              
              {/* Quick Stats */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-heading font-semibold text-card-foreground mb-4">
                  Join Our Community
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Active Users</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">50,000+</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageSquare" size={16} className="text-accent" />
                      <span className="text-sm text-muted-foreground">Movie Reviews</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">2.5M+</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Film" size={16} className="text-secondary" />
                      <span className="text-sm text-muted-foreground">Movies Cataloged</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">100,000+</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-warning" />
                      <span className="text-sm text-muted-foreground">Average Rating</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">4.2/5</span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="HelpCircle" size={18} className="text-accent" />
                  <h3 className="text-lg font-heading font-semibold text-card-foreground">
                    Need Help?
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Having trouble creating your account? We're here to help!
                </p>
                
                <div className="space-y-2">
                  <Link 
                    to="/help" 
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <Icon name="Book" size={14} />
                    <span>Registration Guide</span>
                  </Link>
                  
                  <Link 
                    to="/contact" 
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <Icon name="Mail" size={14} />
                    <span>Contact Support</span>
                  </Link>
                  
                  <Link 
                    to="/faq" 
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <Icon name="MessageCircle" size={14} />
                    <span>Frequently Asked Questions</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Film" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-card-foreground">
                CineReview
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              The ultimate platform for movie enthusiasts to discover, review, and share their passion for cinema.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} CineReview. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;