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
  Work:      { bg: 'bg-blue-100 dark:bg-blue-950/40',    text: 'text-blue-700 dark:text-blue-300',    bar: 'bg-blue-500'    },
  Personal:  { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', bar: 'bg-emerald-500' },
  Education: { bg: 'bg-violet-100 dark:bg-violet-950/40', text: 'text-violet-700 dark:text-violet-300', bar: 'bg-violet-500'  },
  Finance:   { bg: 'bg-amber-100 dark:bg-amber-950/40',  text: 'text-amber-700 dark:text-amber-300',  bar: 'bg-amber-500'   },
  Health:    { bg: 'bg-rose-100 dark:bg-rose-950/40',    text: 'text-rose-700 dark:text-rose-300',    bar: 'bg-rose-500'    },
  Other:     { bg: 'bg-slate-100 dark:bg-slate-800/60',  text: 'text-slate-700 dark:text-slate-300',  bar: 'bg-slate-500'   },
};
