/**
 * Workspace Flow — RecentItems Widget
 * @author Abdelfatah
 * Shows the 5 most recently created workspace items.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { CATEGORY_COLORS } from '@/shared/constants/appConfig';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const RecentItems = ({ items = [] }) => {
  const recent = [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-5 shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary-500" />
          Recent Items
        </h3>
        <Link
          to="/notes"
          className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-surface-400 dark:text-surface-500">No items yet</p>
          <Link
            to="/notes/new"
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold mt-1 inline-block"
          >
            Create your first item
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {recent.map((item) => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
            return (
              <li key={item._id}>
                <Link
                  to={`/notes/${item._id}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/60 transition-colors group"
                >
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${colors.bg} ${colors.text}`}>
                    {item.category}
                  </span>
                  <span className="flex-1 text-sm font-medium text-surface-800 dark:text-surface-200 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-surface-400 dark:text-surface-500 shrink-0">
                    {timeAgo(item.createdAt)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecentItems;
