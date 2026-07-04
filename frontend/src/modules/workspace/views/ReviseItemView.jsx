/**
 * Workspace Flow — ReviseItemView
 * @author Abdelfatah
 * Edit an existing workspace item.
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Loader2 } from 'lucide-react';
import { useInspectItem, useReviseItem } from '../hooks/useWorkspaceCollection';
import ItemComposer from '../components/ItemComposer';

const ReviseItemView = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const { data: item, isLoading, isError } = useInspectItem(id);
  const { mutate: revise, isPending }      = useReviseItem();

  const handleSubmit = (data) => {
    revise(
      { itemId: id, payload: data },
      {
        onSuccess: () => {
          toast.success('Note updated!');
          navigate(`/notes/${id}`);
        },
        onError: (err) => {
          const msg = err?.response?.data?.message || 'Failed to update note.';
          toast.error(msg);
        },
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
      <div className="text-center py-24">
        <p className="text-danger-500 font-body font-semibold">Note not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="vintage-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-200 dark:border-[#5D5246]/50">
          <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600">
            <Pencil className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-surface-800 dark:text-paper-50">Edit Note</h2>
            <p className="text-xs font-body text-surface-400 dark:text-surface-500 truncate max-w-xs">
              {item.title}
            </p>
          </div>
        </div>

        <ItemComposer
          initialData={item}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => navigate(`/notes/${id}`)}
        />
      </div>
    </div>
  );
};

export default ReviseItemView;
