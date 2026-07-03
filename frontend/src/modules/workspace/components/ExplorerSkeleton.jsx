/**
 * Workspace Flow — ExplorerSkeleton
 * @author Abdelfatah
 */

import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden animate-pulse">
    <div className="h-1 bg-surface-200 dark:bg-surface-700 w-full" />
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 skeleton rounded-full" />
        <div className="h-4 w-12 skeleton rounded" />
      </div>
      <div className="h-5 w-3/4 skeleton rounded" />
      <div className="space-y-2">
        <div className="h-3.5 w-full skeleton rounded" />
        <div className="h-3.5 w-5/6 skeleton rounded" />
        <div className="h-3.5 w-4/6 skeleton rounded" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-3 w-10 skeleton rounded" />
        <div className="h-3 w-10 skeleton rounded" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-surface-100 dark:border-surface-800">
        <div className="h-4 w-10 skeleton rounded" />
        <div className="flex gap-1">
          <div className="h-7 w-7 skeleton rounded-lg" />
          <div className="h-7 w-7 skeleton rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const ExplorerSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {[...Array(count)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default ExplorerSkeleton;
