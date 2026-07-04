/**
 * Workspace Flow — Shared Constants
 * @author Abdelfatah
 */
export const APP_NAME = 'Workspace Flow';
export const ITEMS_PER_PAGE = 9;

export const CATEGORIES = ['Work', 'Personal', 'Education', 'Finance', 'Health', 'Other'];

export const STATUSES = [
  { value: 'private', label: 'Private' },
  { value: 'public',  label: 'Public'  },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title',  label: 'Title A–Z'    },
];

export const CATEGORY_COLORS = {
  Work:      { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
  Personal:  { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
  Education: { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
  Finance:   { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
  Health:    { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
  Other:     { bg: 'bg-surface-100 dark:bg-surface-800', text: 'text-surface-700 dark:text-surface-300', bar: 'bg-surface-500', border: 'border-surface-400' },
};
