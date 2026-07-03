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
        toast.success('Item created successfully!');
        navigate('/notes');
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || 'Failed to create item.';
        toast.error(msg);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-100 dark:border-surface-800">
          <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40">
            <PenSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Compose New Item</h2>
            <p className="text-xs text-surface-400 dark:text-surface-500">Fill in the details below</p>
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
