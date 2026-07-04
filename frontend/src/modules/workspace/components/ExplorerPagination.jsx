/**
 * Workspace Flow — ExplorerPagination
 * @author Abdelfatah
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExplorerPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    const left  = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (left > 2)          pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnBase =
    'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-body transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none';
  const inactive =
    'text-surface-600 dark:text-surface-400 border border-surface-300 dark:border-[#5D5246] hover:bg-surface-100 dark:hover:bg-surface-800';
  const active =
    'bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-paper-50 border border-surface-400 dark:border-surface-500';

  return (
    <div className="flex items-center justify-between pt-6 mt-2 border-t border-surface-200 dark:border-[#5D5246]/50">
      <p className="text-sm font-body text-surface-500 dark:text-surface-500 hidden sm:block">
        Page <span className="font-bold text-surface-700 dark:text-paper-50">{currentPage}</span> of{' '}
        <span className="font-bold text-surface-700 dark:text-paper-50">{totalPages}</span>
      </p>

      <nav className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${inactive}`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPages().map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-surface-400 dark:text-surface-500 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${page === currentPage ? active : inactive}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${inactive}`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};

export default ExplorerPagination;
