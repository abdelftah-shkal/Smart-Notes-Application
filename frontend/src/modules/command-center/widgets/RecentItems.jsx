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
    <div className="vintage-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-bold text-surface-800 dark:text-paper-50 flex items-center gap-2">
          <Clock className="w-4 h-4 text-surface-500" />
          Recent Notes
        </h3>
        <Link
          to="/notes"
          className="text-xs font-body text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-paper-50 flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm font-body text-surface-400 dark:text-surface-500">No notes yet</p>
          <Link
            to="/notes/new"
            className="text-xs font-body text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-paper-50 mt-1 inline-block underline"
          >
            Write your first note
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
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800/60 transition-colors group border border-transparent hover:border-surface-200 dark:hover:border-surface-700"
                >
                  <span className={`px-2 py-0.5 rounded text-xs font-body shrink-0 border ${colors.border} ${colors.bg} ${colors.text}`}>
                    {item.category}
                  </span>
                  <span className="flex-1 text-sm font-body text-surface-700 dark:text-surface-300 truncate group-hover:text-surface-900 dark:group-hover:text-paper-50 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs font-body text-surface-400 dark:text-surface-500 shrink-0">
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
