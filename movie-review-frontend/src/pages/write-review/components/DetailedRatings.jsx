import React from 'react';
import RatingSelector from './RatingSelector';

const DetailedRatings = ({ ratings = {}, onRatingChange }) => {
  const categories = [
    {
      key: 'acting',
      label: 'Acting & Performances',
      description: 'How well did the actors portray their characters?'
    },
    {
      key: 'direction',
      label: 'Direction',
      description: 'How effectively was the story told and scenes crafted?'
    },
    {
      key: 'cinematography',
      label: 'Cinematography',
      description: 'Visual composition, lighting, and camera work'
    },
    {
      key: 'story',
      label: 'Story & Script',
      description: 'Plot development, dialogue, and narrative structure'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Detailed Ratings</h2>
        <p className="text-sm text-muted-foreground">
          Rate specific aspects of the movie (optional)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories?.map((category) => (
          <div key={category?.key} className="space-y-2">
            <div>
              <h3 className="font-medium text-foreground">{category?.label}</h3>
              <p className="text-xs text-muted-foreground">{category?.description}</p>
            </div>
            
            <div className="pt-1">
              <RatingSelector
                rating={ratings?.[category?.key] || 0}
                onRatingChange={(rating) => onRatingChange?.(category?.key, rating)}
                size="small"
              />
            </div>
            
            {ratings?.[category?.key] > 0 && (
              <p className="text-xs text-muted-foreground">
                {ratings?.[category?.key]}/5 stars
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Note:</span> Detailed ratings are optional but help provide more specific feedback for other users.
        </p>
      </div>
    </div>
  );
};

export default DetailedRatings;