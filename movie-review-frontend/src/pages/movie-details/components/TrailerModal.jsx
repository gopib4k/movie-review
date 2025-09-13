import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  const modalRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef?.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-6xl mx-4 bg-background rounded-lg shadow-2xl elevation-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Play" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              {movieTitle} - Trailer
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Video Container */}
        <div className="relative bg-black">
          <div className="aspect-video">
            {trailerUrl ? (
              <iframe
                ref={iframeRef}
                src={trailerUrl}
                title={`${movieTitle} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center">
                  <Icon name="PlayCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Trailer not available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Loading Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity">
            <div className="animate-spin">
              <Icon name="Loader2" size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Volume2"
              iconPosition="left"
            >
              Audio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Quality
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Maximize"
              iconPosition="left"
            >
              Fullscreen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;