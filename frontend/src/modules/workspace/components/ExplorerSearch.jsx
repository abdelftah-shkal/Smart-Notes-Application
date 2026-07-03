/**
 * Workspace Flow — ExplorerSearch
 * @author Abdelfatah
 */

import React from 'react';
import { Search, X } from 'lucide-react';

const ExplorerSearch = ({ value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-surface-400">
      <Search className="w-4 h-4" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search titles or content…"
      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default ExplorerSearch;
