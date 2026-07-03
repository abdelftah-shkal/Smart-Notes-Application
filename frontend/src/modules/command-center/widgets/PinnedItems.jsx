/**
 * Workspace Flow — PinnedItems Widget
 * @author Abdelfatah
 * Grid of pinned workspace items shown on the dashboard.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Pin } from 'lucide-react';
import { CATEGORY_COLORS } from '@/shared/constants/appConfig';

const PinnedItems = ({ items = [] }) => {
  const pinned = items.filter((n) => n.is_pinned);

  return (
    <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
        <Pin className="w-4 h-4 text-violet-500" />
        Pinned Items
        <span className="ml-auto text-xs font-medium text-surface-400 dark:text-surface-500">
          {pinned.length} pinned
        </span>
      </h3>

      {pinned.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl">
          <Pin className="w-8 h-8 text-surface-300 dark:text-surface-600 mx-auto mb-2" />
          <p className="text-sm text-surface-400 dark:text-surface-500">No pinned items yet</p>
          <p className="text-xs text-surface-300 dark:text-surface-600 mt-0.5">
            Pin important items to see them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pinned.map((item) => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
            return (
              <Link
                key={item._id}
                to={`/notes/${item._id}`}
                className="group p-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800/50 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {item.category}
                  </span>
                  <Pin className="w-3.5 h-3.5 text-violet-500 ml-auto shrink-0" />
                </div>
                <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-surface-400 dark:text-surface-500 line-clamp-2 mt-1 leading-relaxed">
                  {item.content}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PinnedItems;
