/**
 * Workspace Flow — ComposeItemView
 * @author Abdelfatah
 * Create a new workspace item.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PenSquare } from 'lucide-react';
import { useComposeItem } from '../hooks/useWorkspaceCollection';
import ItemComposer from '../components/ItemComposer';

const ComposeItemView = () => {
  const navigate = useNavigate();
  const { mutate: compose, isPending } = useComposeItem();

  const handleSubmit = (data) => {
    compose(data, {
      onSuccess: () => {
        toast.success('Note created!');
        navigate('/notes');
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || 'Failed to create note.';
        toast.error(msg);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="vintage-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-200 dark:border-[#5D5246]/50">
          <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600">
            <PenSquare className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-surface-800 dark:text-paper-50">Write New Note</h2>
            <p className="text-xs font-body text-surface-400 dark:text-surface-500">Fill in the details below</p>
          </div>
        </div>

        <ItemComposer
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => navigate('/notes')}
        />
      </div>
    </div>
  );
};

export default ComposeItemView;
