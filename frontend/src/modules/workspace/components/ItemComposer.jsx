/**
 * Workspace Flow — ItemComposer
 * @author Abdelfatah
 * Reusable form for creating and editing workspace items.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag, Pin, X } from 'lucide-react';
import { composeItemSchema } from '../schemas/workspaceSchemas';
import FormField   from '@/shared/components/FormField';
import ActionButton from '@/shared/components/ActionButton';
import { CATEGORIES } from '@/shared/constants/appConfig';

const ItemComposer = ({ initialData, onSubmit, isLoading = false, onCancel }) => {
  const [tagPreviews, setTagPreviews] = useState(
    initialData?.tags ? initialData.tags.join(', ') : ''
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(composeItemSchema),
    defaultValues: {
      title:     initialData?.title    || '',
      content:   initialData?.content  || '',
      category:  initialData?.category || '',
      tagInput:  initialData?.tags?.join(', ') || '',
      status:    initialData?.status   || 'private',
      is_pinned: !!initialData?.is_pinned,
    },
  });

  const tagInput = watch('tagInput');

  useEffect(() => {
    setTagPreviews(tagInput || '');
  }, [tagInput]);

  const parsedTags = tagPreviews
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const onFormSubmit = (data) => {
    const tags = data.tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({ title: data.title, content: data.content, category: data.category, tags, status: data.status, is_pinned: data.is_pinned });
  };

  const categoryOptions = [
    { value: '', label: 'Select a category…' },
    ...CATEGORIES.map((c) => ({ value: c, label: c })),
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* Title */}
      <FormField
        label="Title"
        placeholder="Give your item a clear title…"
        error={errors.title?.message}
        {...register('title')}
      />

      {/* Content */}
      <FormField
        label="Content"
        as="textarea"
        placeholder="Write your content here…"
        error={errors.content?.message}
        {...register('content')}
      />

      {/* Category + Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Category"
          as="select"
          options={categoryOptions}
          error={errors.category?.message}
          {...register('category')}
        />
        <div className="flex flex-col gap-1.5">
          <FormField
            label="Tags (comma-separated)"
            placeholder="react, hooks, design…"
            error={errors.tagInput?.message}
            {...register('tagInput')}
          />
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {parsedTags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status + Pin */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-surface-100 dark:border-surface-800">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">
            Status
          </label>
          <select
            {...register('status')}
            className="px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <option value="private">🔒 Private</option>
            <option value="public">🌐 Public</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            type="checkbox"
            {...register('is_pinned')}
            className="w-4 h-4 rounded border-surface-300 dark:border-surface-600 text-primary-600 focus:ring-primary-500 cursor-pointer"
          />
          <span className="flex items-center gap-1.5 text-sm font-medium text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <Pin className="w-4 h-4" />
            Pin this item
          </span>
        </label>

        <div className="flex gap-2 sm:ml-auto">
          {onCancel && (
            <ActionButton type="button" variant="outline" size="sm" onClick={onCancel} disabled={isLoading}>
              Cancel
            </ActionButton>
          )}
          <ActionButton type="submit" size="sm" isLoading={isLoading}>
            {initialData ? 'Save Changes' : 'Create Item'}
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default ItemComposer;
