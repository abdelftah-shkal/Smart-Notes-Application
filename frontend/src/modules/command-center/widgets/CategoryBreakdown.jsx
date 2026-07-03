/**
 * Workspace Flow — CategoryBreakdown Widget
 * @author Abdelfatah
 * Visual breakdown of items grouped by category using colored progress bars.
 */

import React from 'react';
import { CATEGORIES, CATEGORY_COLORS } from '@/shared/constants/appConfig';

const CategoryBreakdown = ({ items = [] }) => {
  const total = items.length || 1; // avoid divide-by-zero

  const groups = CATEGORIES.map((cat) => {
    const count = items.filter((n) => n.category === cat).length;
    return { cat, count, pct: Math.round((count / total) * 100) };
  }).filter((g) => g.count > 0);

  return (
    <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-5 shadow-sm h-full">
      <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4">
        Category Breakdown
      </h3>

      {groups.length === 0 ? (
        <p className="text-sm text-surface-400 dark:text-surface-500 text-center py-6">
          No items yet
        </p>
      ) : (
        <div className="space-y-3">
          {groups.map(({ cat, count, pct }) => {
            const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${colors.text}`}>{cat}</span>
                  <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
