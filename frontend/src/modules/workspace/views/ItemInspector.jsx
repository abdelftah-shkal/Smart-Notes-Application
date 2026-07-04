/**
 * Workspace Flow — ItemInspector
 * @author Abdelfatah
 * Full detail view for a single workspace item.
 */

import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Pencil, Trash2, Pin, Globe, Lock,
  Tag, Calendar, Loader2,
} from 'lucide-react';
import { useInspectItem, useDiscardItem } from '../hooks/useWorkspaceCollection';
import { CATEGORY_COLORS }  from '@/shared/constants/appConfig';
import ActionButton  from '@/shared/components/ActionButton';
import Overlay       from '@/shared/components/Overlay';

const fmt = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const ItemInspector = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const { data: item, isLoading, isError } = useInspectItem(id);
  const { mutate: discard, isPending: isDeleting } = useDiscardItem();

  const handleDelete = () => {
    discard(
      { itemId: id },
      {
        onSuccess: () => { toast.success('Note deleted.'); navigate('/notes'); },
        onError:   () => toast.error('Failed to delete note.'),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-surface-500 animate-spin" />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="text-center py-24 space-y-3">
        <p className="text-danger-500 font-body font-semibold">Note not found.</p>
        <Link to="/notes">
          <ActionButton variant="outline" size="sm" icon={ArrowLeft}>Back to Notes</ActionButton>
        </Link>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-slide-up">
      {/* Back + Actions toolbar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-body text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-paper-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <Link to={`/notes/${id}/edit`}>
            <ActionButton variant="outline" size="sm" icon={Pencil}>Edit</ActionButton>
          </Link>
          <ActionButton variant="danger" size="sm" icon={Trash2} onClick={() => setShowDelete(true)}>
            Delete
          </ActionButton>
        </div>
      </div>

      {/* Main card */}
      <div className="vintage-card overflow-hidden">
        {/* Accent bar */}
        <div className={`h-1.5 w-full ${colors.bar}`} />

        <div className="p-6 md:p-8 space-y-6">
          {/* Title + badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded text-xs font-body border ${colors.border} ${colors.bg} ${colors.text}`}>
                {item.category}
              </span>
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-body border ${
                item.status === 'public'
                  ? 'border-surface-400 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                  : 'border-surface-300 bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400'
              }`}>
                {item.status === 'public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {item.status}
              </span>
              {item.is_pinned && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-body border border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
                  <Pin className="w-3 h-3" /> Pinned
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-surface-800 dark:text-paper-50 leading-snug">
              {item.title}
            </h1>

            <div className="flex items-center gap-1.5 mt-2 text-xs font-body text-surface-400 dark:text-surface-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {fmt(item.createdAt)}</span>
              {item.updatedAt !== item.createdAt && (
                <> · <span>Updated {fmt(item.updatedAt)}</span></>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-surface-200 dark:border-[#5D5246]/50" />

          {/* Content */}
          <div className="font-body text-surface-700 dark:text-surface-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {item.content}
          </div>

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div className="pt-4 border-t border-surface-200 dark:border-[#5D5246]/50">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-surface-400" />
                <span className="text-xs font-body text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded border border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-body"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      <Overlay isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Note" size="sm">
        <p className="text-sm font-body text-surface-500 dark:text-surface-400 mb-6">
          Are you sure you want to permanently delete <strong>"{item.title}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <ActionButton variant="outline" size="sm" onClick={() => setShowDelete(false)} disabled={isDeleting}>
            Cancel
          </ActionButton>
          <ActionButton variant="danger" size="sm" isLoading={isDeleting} onClick={handleDelete}>
            Delete Permanently
          </ActionButton>
        </div>
      </Overlay>
    </div>
  );
};

export default ItemInspector;
