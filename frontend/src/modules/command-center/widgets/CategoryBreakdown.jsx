/**
 * Workspace Flow — CategoryBreakdown Widget
 * @author Abdelfatah
 * Visual breakdown of items grouped by category.
 */

import React from 'react';
import { CATEGORIES } from '@/shared/constants/appConfig';

const CategoryBreakdown = ({ items = [] }) => {
  const total = items.length || 1;

  const groups = CATEGORIES.map((cat) => {
    const count = items.filter((n) => n.category === cat).length;
    return { cat, count, pct: Math.round((count / total) * 100) };
  }).filter((g) => g.count > 0);

  return (
    <div className="vintage-card p-5 h-full">
      <h3 className="text-sm font-heading font-bold text-surface-800 dark:text-paper-50 mb-4">
        Categories
      </h3>

      {groups.length === 0 ? (
        <p className="text-sm font-body text-surface-400 dark:text-surface-500 text-center py-6">
          No notes yet
        </p>
      ) : (
        <div className="space-y-3">
          {groups.map(({ cat, count, pct }) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-body font-semibold text-surface-600 dark:text-surface-400">{cat}</span>
                <span className="text-xs font-body text-surface-400 dark:text-surface-500">
                  {count} {count === 1 ? 'note' : 'notes'}
                </span>
              </div>
              <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden border border-surface-200 dark:border-surface-700">
                <div
                  className="h-full rounded-full bg-surface-400 dark:bg-surface-500 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
