import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthMenu = ({ className = '' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setShowUserMenu(false);
    navigate('/home');
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()?.slice(0, 2);
    }
    return 'U';
  };

  const menuItems = [
    {
      label: 'My Profile',
      icon: 'User',
      path: '/user-profile',
      description: 'Manage your account and preferences'
    },
    {
      label: 'My Reviews',
      icon: 'MessageSquare',
      path: '/user-profile?tab=reviews',
      description: 'View and edit your movie reviews'
    },
    {
      label: 'Watchlist',
      icon: 'Bookmark',
      path: '/user-profile?tab=watchlist',
      description: 'Movies you want to watch'
    },
    {
      label: 'Settings',
      icon: 'Settings',
      path: '/user-profile?tab=settings',
      description: 'Account and privacy settings'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button variant="ghost" asChild>
          <Link to="/login" className="flex items-center space-x-2">
            <Icon name="LogIn" size={16} />
            <span>Sign In</span>
          </Link>
        </Button>
        <Button variant="default" asChild>
          <Link to="/register" className="flex items-center space-x-2">
            <Icon name="UserPlus" size={16} />
            <span>Sign Up</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <Button
        variant="ghost"
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-2 p-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name || 'User'}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span className={user?.avatar ? 'hidden' : 'block'}>
            {getUserInitials()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-foreground">
            {user?.name || 'User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.email || 'user@example.com'}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
        />
      </Button>
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-72 bg-popover border border-border rounded-md shadow-lg elevation-3 z-200 animate-slide-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt={user?.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span className={user?.avatar ? 'hidden' : 'block'}>
                  {getUserInitials()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className="flex items-center px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors group"
                onClick={() => setShowUserMenu(false)}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="mr-3 text-muted-foreground group-hover:text-foreground transition-colors" 
                />
                <div className="flex-1">
                  <p className="font-medium">{item?.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item?.description}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border"></div>

          {/* Logout */}
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors group"
            >
              <Icon 
                name="LogOut" 
                size={16} 
                className="mr-3 text-muted-foreground group-hover:text-error transition-colors" 
              />
              <div className="flex-1 text-left">
                <p className="font-medium group-hover:text-error transition-colors">
                  Sign Out
                </p>
                <p className="text-xs text-muted-foreground">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthMenu;