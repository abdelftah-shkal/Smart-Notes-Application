/**
 * Workspace Flow — EmptyExplorer
 * @author Abdelfatah
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PenSquare } from 'lucide-react';
import ActionButton from '@/shared/components/ActionButton';

const EmptyExplorer = ({ hasFilters = false }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <div className="w-20 h-20 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 flex items-center justify-center mb-5">
      <FileText className="w-9 h-9 text-surface-300 dark:text-surface-600" />
    </div>

    {hasFilters ? (
      <>
        <h3 className="text-lg font-heading font-bold text-surface-700 dark:text-surface-400 mb-1">
          No matching notes
        </h3>
        <p className="text-sm font-body text-surface-400 dark:text-surface-500 max-w-xs">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-heading font-bold text-surface-700 dark:text-surface-400 mb-1">
          Your notebook is empty
        </h3>
        <p className="text-sm font-body text-surface-400 dark:text-surface-500 max-w-xs mb-6">
          Start capturing your thoughts, ideas, and notes.
        </p>
        <Link to="/notes/new">
          <ActionButton icon={PenSquare}>Write First Note</ActionButton>
        </Link>
      </>
    )}
  </div>
);

export default EmptyExplorer;
