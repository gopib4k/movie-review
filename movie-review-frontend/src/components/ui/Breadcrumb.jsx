import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [], className = '' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/home', icon: 'Home' }];

    const routeMap = {
      'movie-listings': { label: 'Movies', icon: 'Film' },
      'movie-details': { label: 'Movie Details', icon: 'Info' },
      'user-profile': { label: 'My Profile', icon: 'User' },
      'login': { label: 'Sign In', icon: 'LogIn' },
      'register': { label: 'Sign Up', icon: 'UserPlus' }
    };

    pathSegments?.forEach((segment, index) => {
      const route = routeMap?.[segment];
      if (route) {
        const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
        breadcrumbs?.push({
          label: route?.label,
          path: path,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  // Don't show breadcrumbs on home page or if only home exists
  if (breadcrumbItems?.length <= 1 || location?.pathname === '/home') {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item?.path || index} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              {isLast ? (
                <span 
                  className="flex items-center space-x-1 text-foreground font-medium"
                  aria-current="page"
                >
                  {item?.icon && (
                    <Icon 
                      name={item?.icon} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                  )}
                  <span>{item?.label}</span>
                </span>
              ) : (
                <Link
                  to={item?.path}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-sm px-1 py-0.5 hover:bg-muted"
                >
                  {item?.icon && (
                    <Icon 
                      name={item?.icon} 
                      size={14} 
                    />
                  )}
                  <span>{item?.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Breadcrumb Item Component for custom usage
export const BreadcrumbItem = ({ 
  label, 
  path, 
  icon, 
  isLast = false, 
  onClick 
}) => {
  const content = (
    <span className="flex items-center space-x-1">
      {icon && <Icon name={icon} size={14} />}
      <span>{label}</span>
    </span>
  );

  if (isLast) {
    return (
      <span 
        className="text-foreground font-medium"
        aria-current="page"
      >
        {content}
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-sm px-1 py-0.5 hover:bg-muted"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={path}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-sm px-1 py-0.5 hover:bg-muted"
    >
      {content}
    </Link>
  );
};

// Breadcrumb Separator Component
export const BreadcrumbSeparator = ({ className = '' }) => (
  <Icon 
    name="ChevronRight" 
    size={14} 
    className={`text-muted-foreground ${className}`} 
  />
);

export default Breadcrumb;