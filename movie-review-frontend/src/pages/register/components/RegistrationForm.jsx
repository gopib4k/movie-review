import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import axios from 'axios';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    favoriteGenres: [],
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Science Fiction', 'Thriller', 'War', 'Western'
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[0-9]/?.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return 'Very Weak';
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'bg-error';
      case 2: return 'bg-warning';
      case 3: return 'bg-secondary';
      case 4: return 'bg-accent';
      case 5: return 'bg-success';
      default: return 'bg-error';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    
    if (type === 'checkbox') {
      if (name === 'favoriteGenres') {
        setFormData(prev => ({
          ...prev,
          favoriteGenres: checked 
            ? [...prev?.favoriteGenres, value]
            : prev?.favoriteGenres?.filter(genre => genre !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value));
      }
    }

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
  e?.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    // Call backend registration API
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      displayName: formData.displayName,
      favoriteGenres: formData.favoriteGenres,
    });

    // Response contains JWT token and user data
    const { token, user } = response.data;

    // Store token and user info in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('userWatchlist', JSON.stringify([]));

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-20 right-4 z-300 px-6 py-3 bg-success text-success-foreground rounded-md shadow-lg elevation-2 text-sm font-medium';
    successMessage.textContent = 'Account created successfully! Welcome to CineReview!';
    document.body?.appendChild(successMessage);

    setTimeout(() => {
      if (document.body?.contains(successMessage)) {
        document.body?.removeChild(successMessage);
      }
    }, 3000);

    // Redirect to home page
    navigate('/home');

  } catch (error) {
    const msg = error.response?.data?.message || 'Registration failed. Please try again.';
    setErrors({ submit: msg });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={32} color="white" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Join CineReview
        </h1>
        <p className="text-muted-foreground">
          Create your account to start reviewing movies and building your watchlist
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Choose a unique username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          description="This will be visible to other users"
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          description="We'll send you a verification email"
        />

        {/* Display Name */}
        <Input
          label="Display Name"
          type="text"
          name="displayName"
          placeholder="How should we display your name?"
          value={formData?.displayName}
          onChange={handleInputChange}
          error={errors?.displayName}
          required
          description="This name will appear on your reviews"
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Password Strength</span>
                <span className={`font-medium ${
                  passwordStrength >= 4 ? 'text-success' : 
                  passwordStrength >= 3 ? 'text-accent' : 
                  passwordStrength >= 2 ? 'text-warning' : 'text-error'
                }`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Include uppercase, lowercase, numbers, and special characters
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />

        {/* Favorite Genres */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Favorite Movie Genres (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genres?.map((genre) => (
              <Checkbox
                key={genre}
                label={genre}
                name="favoriteGenres"
                value={genre}
                checked={formData?.favoriteGenres?.includes(genre)}
                onChange={handleInputChange}
                size="sm"
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Help us recommend movies you'll love
          </p>
        </div>

        {/* Terms Agreement */}
        <div>
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            }
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors?.submit}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;