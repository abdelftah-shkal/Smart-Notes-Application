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
    <div className="vintage-card p-5">
      <h3 className="text-sm font-heading font-bold text-surface-800 dark:text-paper-50 mb-4 flex items-center gap-2">
        <Pin className="w-4 h-4 text-surface-500" />
        Pinned Notes
        <span className="ml-auto text-xs font-body text-surface-400 dark:text-surface-500">
          {pinned.length} pinned
        </span>
      </h3>

      {pinned.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-surface-300 dark:border-[#5D5246] rounded-lg">
          <Pin className="w-8 h-8 text-surface-300 dark:text-surface-600 mx-auto mb-2" />
          <p className="text-sm font-body text-surface-400 dark:text-surface-500">No pinned notes yet</p>
          <p className="text-xs font-body text-surface-300 dark:text-surface-600 mt-0.5">
            Pin important notes to see them here
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
                className="group p-4 rounded-lg vintage-card-sm hover:card-hover transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-body px-2 py-0.5 rounded border ${colors.border} ${colors.bg} ${colors.text}`}>
                    {item.category}
                  </span>
                  <Pin className="w-3.5 h-3.5 text-surface-400 ml-auto shrink-0" />
                </div>
                <p className="text-sm font-heading font-semibold text-surface-700 dark:text-surface-300 line-clamp-1 group-hover:text-surface-900 dark:group-hover:text-paper-50 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs font-body text-surface-400 dark:text-surface-500 line-clamp-2 mt-1 leading-relaxed">
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
