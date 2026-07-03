/**
 * Workspace Flow — ActionButton
 * @author Abdelfatah
 * Premium button component with multiple variants, sizes, loading state, and icon support.
 */

import React from 'react';

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500',
  secondary:
    'bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-100 focus:ring-surface-400',
  danger:
    'bg-gradient-to-r from-danger-500 to-rose-600 hover:from-danger-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg focus:ring-danger-500',
  outline:
    'border border-surface-300 dark:border-surface-600 bg-transparent hover:bg-surface-50 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 focus:ring-primary-500',
  ghost:
    'bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 focus:ring-primary-500',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

const ActionButton = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon = null,
  className = '',
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};

export default ActionButton;
