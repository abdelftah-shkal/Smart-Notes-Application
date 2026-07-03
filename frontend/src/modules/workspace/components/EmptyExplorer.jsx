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
    <div className="w-20 h-20 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-5 shadow-inner">
      <FileText className="w-9 h-9 text-surface-300 dark:text-surface-600" />
    </div>

    {hasFilters ? (
      <>
        <h3 className="text-lg font-bold text-surface-700 dark:text-surface-300 mb-1">
          No matching items
        </h3>
        <p className="text-sm text-surface-400 dark:text-surface-500 max-w-xs">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-bold text-surface-700 dark:text-surface-300 mb-1">
          Your workspace is empty
        </h3>
        <p className="text-sm text-surface-400 dark:text-surface-500 max-w-xs mb-6">
          Start capturing your ideas, tasks, and notes. Create your first workspace item now.
        </p>
        <Link to="/notes/new">
          <ActionButton icon={PenSquare}>Create First Item</ActionButton>
        </Link>
      </>
    )}
  </div>
);

export default EmptyExplorer;
