import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onBulkRemove, onBulkPriority, onClearSelection }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleConfirmAction = (action) => {
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const executeAction = () => {
    if (confirmAction === 'remove') {
      onBulkRemove();
    } else if (confirmAction === 'priority-add') {
      onBulkPriority(true);
    } else if (confirmAction === 'priority-remove') {
      onBulkPriority(false);
    }
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Confirm Action
          </h3>
          <p className="text-muted-foreground mb-6">
            {confirmAction === 'remove' && `Are you sure you want to remove ${selectedCount} movie${selectedCount === 1 ? '' : 's'} from your watchlist?`}
            {confirmAction === 'priority-add' && `Mark ${selectedCount} movie${selectedCount === 1 ? '' : 's'} as priority?`}
            {confirmAction === 'priority-remove' && `Remove priority status from ${selectedCount} movie${selectedCount === 1 ? '' : 's'}?`}
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelAction}
              className="px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={executeAction}
              className={`px-4 py-2 rounded-md transition-colors ${
                confirmAction === 'remove' ?'bg-destructive text-destructive-foreground hover:bg-destructive/90' :'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckCircle" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} movie{selectedCount === 1 ? '' : 's'} selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleConfirmAction('priority-add')}
            className="flex items-center gap-1 px-3 py-1.5 bg-warning text-warning-foreground text-sm rounded-md hover:bg-warning/90 transition-colors"
          >
            <Icon name="Star" size={14} />
            Mark Priority
          </button>
          
          <button
            onClick={() => handleConfirmAction('priority-remove')}
            className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/80 transition-colors"
          >
            <Icon name="StarOff" size={14} />
            Remove Priority
          </button>

          <button
            onClick={() => handleConfirmAction('remove')}
            className="flex items-center gap-1 px-3 py-1.5 bg-destructive text-destructive-foreground text-sm rounded-md hover:bg-destructive/90 transition-colors"
          >
            <Icon name="Trash2" size={14} />
            Remove All
          </button>

          <button
            onClick={onClearSelection}
            className="flex items-center gap-1 px-3 py-1.5 border border-input text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Icon name="X" size={14} />
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;