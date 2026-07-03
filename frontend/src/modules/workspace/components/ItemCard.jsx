/**
 * Workspace Flow — ItemCard
 * @author Abdelfatah
 * Glassmorphic note card with category accent, hover lift, and action buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Pin, Pencil, Trash2, Eye } from 'lucide-react';
import { CATEGORY_COLORS } from '@/shared/constants/appConfig';

const ACCENT_BARS = {
  Work:      'bg-blue-500',
  Personal:  'bg-emerald-500',
  Education: 'bg-violet-500',
  Finance:   'bg-amber-500',
  Health:    'bg-rose-500',
  Other:     'bg-slate-400',
};

const ItemCard = ({ item, onDelete }) => {
  const { _id, title, content, category, tags, status, is_pinned } = item;
  const colors  = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  const accent  = ACCENT_BARS[category]     || ACCENT_BARS.Other;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border overflow-hidden card-hover
        ${is_pinned
          ? 'bg-white dark:bg-surface-900 border-primary-200 dark:border-primary-800/50 shadow-md'
          : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700/60 hover:border-surface-300 dark:hover:border-surface-600 shadow-sm'
        }`}
    >
      {/* Category accent bar */}
      <div className={`h-1 w-full ${accent}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
            {category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded
              ${status === 'public'
                ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400'
              }`}>
              {status}
            </span>
            {is_pinned && <Pin className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link to={`/notes/${_id}`}>{title}</Link>
        </h3>

        {/* Content preview */}
        <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-3 leading-relaxed flex-1">
          {content}
        </p>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="text-xs text-surface-400 dark:text-surface-500 hover:text-primary-500 transition-colors">
                #{tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-xs text-surface-300 dark:text-surface-600">+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-100 dark:border-surface-800">
          <Link
            to={`/notes/${_id}`}
            className="inline-flex items-center gap-1 text-xs text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to={`/notes/${_id}/edit`}
              className="p-1.5 rounded-lg text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete?.(_id)}
              className="p-1.5 rounded-lg text-surface-400 hover:text-danger-600 dark:hover:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
