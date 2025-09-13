import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to home
  const from = location?.state?.from || '/home';
  const message = location?.state?.message;

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'user@cinereview.com',
    password: 'password123'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        const userData = {
          id: 1,
          name: 'John Doe',
          email: formData?.email,
          avatar: null,
          joinedDate: '2024-01-15',
          reviewCount: 12,
          watchlistCount: 8
        };

        // Store auth token and user data
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userData', JSON.stringify(userData));

        // Set remember me preference
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Show success message
        showFeedback('Login successful! Welcome back.', 'success');

        // Redirect after short delay
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);

      } else {
        // Invalid credentials
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}`
        });
      }

    } catch (error) {
      setErrors({
        general: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showFeedback = (message, type) => {
    const feedback = document.createElement('div');
    feedback.className = `fixed top-20 right-4 z-300 px-4 py-2 rounded-md shadow-lg elevation-2 text-sm font-medium transition-all duration-300 ${
      type === 'success' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
    }`;
    
    feedback.textContent = message;
    document.body?.appendChild(feedback);

    setTimeout(() => {
      feedback.style.transform = 'translateX(0)';
      feedback.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      feedback.style.transform = 'translateX(100%)';
      feedback.style.opacity = '0';
      setTimeout(() => {
        if (document.body?.contains(feedback)) {
          document.body?.removeChild(feedback);
        }
      }, 300);
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-lg elevation-2 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Film" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-card-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your CineReview account
          </p>
        </div>

        {/* Message from redirect */}
        {message && (
          <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-md">
            <p className="text-sm text-accent font-medium">
              {message}
            </p>
          </div>
        )}

        {/* General Error */}
        {errors?.general && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error font-medium">
                {errors?.general}
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <Button variant="outline" fullWidth asChild>
            <Link to="/register" className="flex items-center justify-center space-x-2">
              <Icon name="UserPlus" size={16} />
              <span>Create New Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;