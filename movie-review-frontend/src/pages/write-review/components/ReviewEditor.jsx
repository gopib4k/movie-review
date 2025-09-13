import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ReviewEditor = ({ content = '', onContentChange, containsSpoilers = false, onSpoilerToggle }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const minLength = 50;
  const maxLength = 5000;
  const currentLength = content?.length || 0;

  const handleTextChange = (e) => {
    let newContent = e?.target?.value;
    if (newContent?.length <= maxLength) {
      onContentChange?.(newContent);
    }
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById('review-textarea');
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = content?.substring(start, end);
    
    let newContent = content;
    let formatStart, formatEnd;

    switch (format) {
      case 'bold':
        formatStart = '**';
        formatEnd = '**';
        break;
      case 'italic':
        formatStart = '*';
        formatEnd = '*';
        break;
      default:
        return;
    }

    if (selectedText) {
      // Wrap selected text
      newContent = content?.substring(0, start) + 
                   formatStart + selectedText + formatEnd + 
                   content?.substring(end);
    } else {
      // Insert format markers
      newContent = content?.substring(0, start) + 
                   formatStart + formatEnd + 
                   content?.substring(start);
    }

    onContentChange?.(newContent);

    // Restore focus and cursor position
    setTimeout(() => {
      textarea?.focus();
      const newPos = selectedText ? start + formatStart?.length + selectedText?.length + formatEnd?.length : start + formatStart?.length;
      textarea?.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Your Review</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => insertFormatting('bold')}
            className="p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Bold"
          >
            <Icon name="Bold" size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('italic')}
            className="p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Italic"
          >
            <Icon name="Italic" size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            id="review-textarea"
            value={content}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Share your detailed thoughts about this movie... What did you love? What could have been better? How did it make you feel?"
            className={`w-full h-48 px-4 py-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
              isFocused ? 'border-ring' : 'border-input'
            }`}
          />
          
          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
            {currentLength}/{maxLength}
          </div>
        </div>

        {/* Length indicator */}
        <div className="flex items-center gap-2 text-sm">
          {currentLength < minLength ? (
            <>
              <Icon name="AlertCircle" size={14} className="text-warning" />
              <span className="text-warning">
                {minLength - currentLength} more characters needed (minimum {minLength})
              </span>
            </>
          ) : (
            <>
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-success">Great! Your review meets the minimum length</span>
            </>
          )}
        </div>

        {/* Spoiler warning */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={containsSpoilers}
              onChange={(e) => onSpoilerToggle?.(e?.target?.checked)}
              className="w-4 h-4 text-primary border-2 border-input rounded focus:ring-ring focus:ring-2"
            />
            <span className="text-sm text-foreground">This review contains spoilers</span>
          </label>
          
          {containsSpoilers && (
            <div className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded">
              <Icon name="AlertTriangle" size={12} />
              <span>Spoiler warning will be shown</span>
            </div>
          )}
        </div>

        {/* Writing tips */}
        {isFocused && currentLength < 20 && (
          <div className="bg-muted/50 border border-muted rounded-lg p-4 text-sm">
            <h4 className="font-medium text-foreground mb-2">💡 Writing Tips</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Share what you liked and disliked about the movie</li>
              <li>• Mention specific scenes, performances, or technical aspects</li>
              <li>• Consider the story, characters, cinematography, and soundtrack</li>
              <li>• Be honest but constructive in your criticism</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewEditor;