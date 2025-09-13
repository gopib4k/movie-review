import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailReviews: true,
    emailWatchlist: false,
    emailNewsletter: true,
    pushReviews: true,
    pushWatchlist: true,
    pushNewMovies: false
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    reviewsPublic: true,
    watchlistPublic: false,
    showRealName: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-4 z-300 px-4 py-2 bg-success text-success-foreground rounded-md shadow-lg';
      successMsg.textContent = 'Password updated successfully!';
      document.body?.appendChild(successMsg);
      
      setTimeout(() => {
        if (document.body?.contains(successMsg)) {
          document.body?.removeChild(successMsg);
        }
      }, 3000);

    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('userNotifications', JSON.stringify(notifications));
      localStorage.setItem('userPrivacy', JSON.stringify(privacy));
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-4 z-300 px-4 py-2 bg-success text-success-foreground rounded-md shadow-lg';
      successMsg.textContent = 'Settings saved successfully!';
      document.body?.appendChild(successMsg);
      
      setTimeout(() => {
        if (document.body?.contains(successMsg)) {
          document.body?.removeChild(successMsg);
        }
      }, 3000);

    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your reviews, watchlist, and profile data.'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This is your final warning. Deleting your account will permanently remove all your data. Are you absolutely sure?'
      );
      
      if (doubleConfirm) {
        // In real app, this would call delete API
        localStorage.clear();
        window.location.href = '/home';
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Lock" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            error={errors?.currentPassword}
            required
            placeholder="Enter your current password"
          />

          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            error={errors?.newPassword}
            required
            placeholder="Enter your new password"
            description="Must be at least 8 characters long"
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
            placeholder="Confirm your new password"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <Checkbox
                label="New reviews on movies I've reviewed"
                description="Get notified when someone reviews a movie you've also reviewed"
                checked={notifications?.emailReviews}
                onChange={(e) => handleNotificationChange('emailReviews', e?.target?.checked)}
              />
              <Checkbox
                label="Watchlist movie updates"
                description="Get notified about new information for movies in your watchlist"
                checked={notifications?.emailWatchlist}
                onChange={(e) => handleNotificationChange('emailWatchlist', e?.target?.checked)}
              />
              <Checkbox
                label="Newsletter and movie recommendations"
                description="Receive weekly movie recommendations and platform updates"
                checked={notifications?.emailNewsletter}
                onChange={(e) => handleNotificationChange('emailNewsletter', e?.target?.checked)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Push Notifications</h3>
            <div className="space-y-3">
              <Checkbox
                label="Review interactions"
                description="When someone likes or comments on your reviews"
                checked={notifications?.pushReviews}
                onChange={(e) => handleNotificationChange('pushReviews', e?.target?.checked)}
              />
              <Checkbox
                label="Watchlist reminders"
                description="Periodic reminders about movies in your watchlist"
                checked={notifications?.pushWatchlist}
                onChange={(e) => handleNotificationChange('pushWatchlist', e?.target?.checked)}
              />
              <Checkbox
                label="New movie releases"
                description="Get notified about new movie releases in your favorite genres"
                checked={notifications?.pushNewMovies}
                onChange={(e) => handleNotificationChange('pushNewMovies', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Shield" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Make my profile public"
            description="Allow other users to view your profile and activity"
            checked={privacy?.profilePublic}
            onChange={(e) => handlePrivacyChange('profilePublic', e?.target?.checked)}
          />
          <Checkbox
            label="Make my reviews public"
            description="Allow your reviews to be visible to all users"
            checked={privacy?.reviewsPublic}
            onChange={(e) => handlePrivacyChange('reviewsPublic', e?.target?.checked)}
          />
          <Checkbox
            label="Make my watchlist public"
            description="Allow other users to see your watchlist"
            checked={privacy?.watchlistPublic}
            onChange={(e) => handlePrivacyChange('watchlistPublic', e?.target?.checked)}
          />
          <Checkbox
            label="Show my real name"
            description="Display your real name instead of username on reviews"
            checked={privacy?.showRealName}
            onChange={(e) => handlePrivacyChange('showRealName', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Save Settings */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Settings are automatically saved when changed
        </div>
        <Button
          onClick={saveSettings}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save All Settings
        </Button>
      </div>
      {/* Danger Zone */}
      <div className="bg-card border border-error/20 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={20} className="text-error" />
          <h2 className="text-xl font-semibold text-error">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Delete My Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;