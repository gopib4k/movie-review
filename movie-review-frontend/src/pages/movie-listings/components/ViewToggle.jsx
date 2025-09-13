import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ 
  currentView = 'grid', 
  onViewChange, 
  className = '',
  showLabels = false 
}) => {
  const views = [
    {
      id: 'grid',
      icon: 'Grid3X3',
      label: 'Grid View',
      description: 'View movies in a grid layout'
    },
    {
      id: 'list',
      icon: 'List',
      label: 'List View',
      description: 'View movies in a detailed list'
    },
    {
      id: 'compact',
      icon: 'LayoutGrid',
      label: 'Compact View',
      description: 'View more movies in compact grid'
    }
  ];

  return (
    <div className={`flex items-center ${className}`}>
      {showLabels && (
        <span className="text-sm font-medium text-muted-foreground mr-3">
          View:
        </span>
      )}
      <div className="flex items-center bg-muted rounded-lg p-1">
        {views?.map((view) => (
          <Button
            key={view?.id}
            variant={currentView === view?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(view?.id)}
            className={`px-3 py-2 ${currentView === view?.id ? 'shadow-sm' : ''}`}
            title={view?.description}
          >
            <Icon name={view?.icon} size={16} />
            {showLabels && (
              <span className="ml-2 hidden sm:inline">
                {view?.label}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Dropdown variant for mobile
export const ViewToggleDropdown = ({ 
  currentView = 'grid', 
  onViewChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const views = [
    {
      id: 'grid',
      icon: 'Grid3X3',
      label: 'Grid View',
      description: 'View movies in a grid layout'
    },
    {
      id: 'list',
      icon: 'List',
      label: 'List View',
      description: 'View movies in a detailed list'
    },
    {
      id: 'compact',
      icon: 'LayoutGrid',
      label: 'Compact View',
      description: 'View more movies in compact grid'
    }
  ];

  const currentViewData = views?.find(view => view?.id === currentView);

  const handleViewSelect = (viewId) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Icon name={currentViewData?.icon || 'Grid3X3'} size={16} />
        <span className="hidden sm:inline">{currentViewData?.label}</span>
        <Icon name="ChevronDown" size={14} />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg elevation-2 z-200">
          <div className="py-1">
            {views?.map((view) => (
              <button
                key={view?.id}
                onClick={() => handleViewSelect(view?.id)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center space-x-3 ${
                  currentView === view?.id ? 'bg-muted text-primary' : 'text-popover-foreground'
                }`}
              >
                <Icon name={view?.icon} size={16} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{view?.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {view?.description}
                  </p>
                </div>
                {currentView === view?.id && (
                  <Icon name="Check" size={14} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ViewToggle;