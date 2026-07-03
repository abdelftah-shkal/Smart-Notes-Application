/**
 * Workspace Flow — ExplorerToolbar
 * @author Abdelfatah
 * Shows active filter chips and a clear-all button.
 */

import React from 'react';
import { X } from 'lucide-react';

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-semibold">
    {label}
    <button onClick={onRemove} className="hover:text-danger-500 transition-colors cursor-pointer">
      <X className="w-3 h-3" />
    </button>
  </span>
);

const ExplorerToolbar = ({
  search, onSearchChange,
  category, onCategoryChange,
  status, onStatusChange,
}) => {
  const chips = [
    search   && { label: `"${search}"`,  onRemove: () => onSearchChange('')   },
    category && { label: category,        onRemove: () => onCategoryChange('') },
    status   && { label: status,          onRemove: () => onStatusChange('')   },
  ].filter(Boolean);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">Active:</span>
      {chips.map((chip) => (
        <Chip key={chip.label} {...chip} />
      ))}
      <button
        onClick={() => { onSearchChange(''); onCategoryChange(''); onStatusChange(''); }}
        className="text-xs text-surface-400 hover:text-danger-500 dark:hover:text-danger-400 transition-colors font-medium cursor-pointer ml-1"
      >
        Clear all
      </button>
    </div>
  );
};

export default ExplorerToolbar;
