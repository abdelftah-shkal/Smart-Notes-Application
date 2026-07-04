/**
 * Workspace Flow — FilterPanel
 * @author Abdelfatah
 */

import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, STATUSES } from '@/shared/constants/appConfig';

const FilterPanel = ({ category, onCategoryChange, status, onStatusChange }) => {
  const hasFilters = category || status;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 vintage-card-sm">
      <div className="flex items-center gap-1.5 text-xs font-body text-surface-500 dark:text-surface-400 uppercase tracking-wider">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Filters
      </div>

      {/* Category */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-body text-surface-500 dark:text-surface-400">Category</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-surface-300 dark:border-[#5D5246] bg-paper-50 dark:bg-[#2A241F] text-sm font-body text-surface-800 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-surface-400/50 cursor-pointer"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-body text-surface-500 dark:text-surface-400">Status</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-surface-300 dark:border-[#5D5246] bg-paper-50 dark:bg-[#2A241F] text-sm font-body text-surface-800 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-surface-400/50 cursor-pointer"
        >
          <option value="">All Status</option>
          {STATUSES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={() => { onCategoryChange(''); onStatusChange(''); }}
          className="flex items-center gap-1 text-xs font-body text-danger-500 hover:text-danger-600 dark:text-danger-400 dark:hover:text-danger-300 transition-colors cursor-pointer ml-auto"
        >
          <X className="w-3.5 h-3.5" /> Clear filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
