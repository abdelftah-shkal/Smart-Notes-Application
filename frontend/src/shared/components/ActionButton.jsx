/**
 * Workspace Flow — ActionButton
 * @author Abdelfatah
 * Premium button component with multiple variants, sizes, loading state, and icon support.
 */

import React from 'react';

const VARIANTS = {
  primary:
    'bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-800 dark:text-paper-50 border border-surface-400 dark:border-surface-600 shadow-sm hover:shadow-md focus:ring-surface-400',
  secondary:
    'bg-paper-50 hover:bg-surface-100 dark:bg-[#2A241F] dark:hover:bg-surface-800 text-surface-700 dark:text-paper-50 border border-surface-400 dark:border-surface-600 focus:ring-surface-400',
  danger:
    'bg-danger-50 hover:bg-danger-100 dark:bg-danger-600/20 dark:hover:bg-danger-600/30 text-danger-600 dark:text-danger-400 border border-danger-400 dark:border-danger-600 shadow-sm hover:shadow-md focus:ring-danger-400',
  outline:
    'border border-surface-300 dark:border-surface-600 bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 focus:ring-surface-400',
  ghost:
    'bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 focus:ring-surface-400',
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
    'inline-flex items-center justify-center font-body font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-surface-400/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

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
