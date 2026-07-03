/**
 * Workspace Flow — FormField
 * @author Abdelfatah
 * Unified form field: input, textarea, or select — with label, error, and dark mode.
 */

import React from 'react';

const baseInput =
  'w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm';

const normalBorder = 'border-surface-200 dark:border-surface-700';
const errorBorder  = 'border-danger-400 dark:border-danger-500 focus:ring-danger-500';

const FormField = React.forwardRef(
  ({ label, error, type = 'text', as = 'input', className = '', options = [], ...props }, ref) => {
    const inputClass = `${baseInput} ${error ? errorBorder : normalBorder} ${className}`;

    return (
      <div className="flex flex-col gap-1.5 text-left w-full">
        {label && (
          <label className="text-sm font-semibold text-surface-700 dark:text-surface-300">
            {label}
          </label>
        )}

        {as === 'textarea' ? (
          <textarea
            ref={ref}
            rows={5}
            className={`${inputClass} resize-none`}
            {...props}
          />
        ) : as === 'select' ? (
          <select ref={ref} className={`${inputClass} cursor-pointer`} {...props}>
            {options.map((opt) =>
              typeof opt === 'string' ? (
                <option key={opt} value={opt}>{opt}</option>
              ) : (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )
            )}
          </select>
        ) : (
          <input ref={ref} type={type} className={inputClass} {...props} />
        )}

        {error && (
          <p className="text-xs text-danger-500 font-medium flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
