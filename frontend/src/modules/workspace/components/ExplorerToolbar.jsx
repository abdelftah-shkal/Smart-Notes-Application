/**
 * Workspace Flow — ExplorerToolbar
 * @author Abdelfatah
 * Shows active filter chips and a clear-all button.
 */

import React from 'react';
import { X } from 'lucide-react';

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-body">
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
      <span className="text-xs font-body text-surface-400 dark:text-surface-500">Active:</span>
      {chips.map((chip) => (
        <Chip key={chip.label} {...chip} />
      ))}
      <button
        onClick={() => { onSearchChange(''); onCategoryChange(''); onStatusChange(''); }}
        className="text-xs font-body text-surface-400 hover:text-danger-500 dark:hover:text-danger-400 transition-colors cursor-pointer ml-1"
      >
        Clear all
      </button>
    </div>
  );
};

export default ExplorerToolbar;
