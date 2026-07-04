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
      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-surface-300 dark:border-[#5D5246] bg-paper-50 dark:bg-[#2A241F] text-surface-800 dark:text-paper-50 placeholder-surface-400 dark:placeholder-surface-500 text-sm font-body focus:outline-none focus:ring-2 focus:ring-surface-400/50 focus:border-surface-400 transition-all duration-200"
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
