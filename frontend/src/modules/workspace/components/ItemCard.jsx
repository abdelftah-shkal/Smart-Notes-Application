/**
 * Workspace Flow — ItemCard
 * @author Abdelfatah
 * Vintage paper note card with subtle hover and action buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Pin, Pencil, Trash2, Eye } from 'lucide-react';
import { CATEGORY_COLORS } from '@/shared/constants/appConfig';

const ItemCard = ({ item, onDelete }) => {
  const { _id, title, content, category, tags, status, is_pinned } = item;
  const colors  = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;

  return (
    <div className="group relative flex flex-col vintage-card overflow-hidden">
      {/* Category accent bar */}
      <div className={`h-1 w-full ${colors.bar}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded text-xs font-body border ${colors.border} ${colors.bg} ${colors.text}`}>
            {category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] uppercase font-body tracking-wider px-1.5 py-0.5 rounded border ${
              status === 'public'
                ? 'border-surface-400 text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800'
                : 'border-surface-300 text-surface-500 dark:text-surface-500 bg-surface-100 dark:bg-surface-800'
            }`}>
              {status}
            </span>
            {is_pinned && <Pin className="w-3.5 h-3.5 text-surface-500" />}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-heading font-bold text-surface-800 dark:text-paper-50 mb-2 line-clamp-1 group-hover:text-surface-900 dark:group-hover:text-white transition-colors">
          <Link to={`/notes/${_id}`}>{title}</Link>
        </h3>

        {/* Content preview */}
        <p className="text-sm font-body text-surface-500 dark:text-surface-500 line-clamp-3 leading-relaxed flex-1">
          {content}
        </p>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="text-xs font-body text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-400 transition-colors">
                #{tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-xs font-body text-surface-300 dark:text-surface-600">+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-200 dark:border-[#5D5246]/50">
          <Link
            to={`/notes/${_id}`}
            className="inline-flex items-center gap-1 text-xs font-body text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to={`/notes/${_id}/edit`}
              className="p-1.5 rounded text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete?.(_id)}
              className="p-1.5 rounded text-surface-400 hover:text-danger-600 dark:hover:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors cursor-pointer"
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
