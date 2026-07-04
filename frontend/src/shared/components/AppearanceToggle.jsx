/**
 * Workspace Flow — AppearanceToggle
 * @author Abdelfatah
 * Animated sun/moon toggle button for dark/light mode switching.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAppearance } from '@/app/state/globalStore';
import { Sun, Moon } from 'lucide-react';

const AppearanceToggle = () => {
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.interface.appearance);
  const isDark = appearance === 'dark';

  return (
    <button
      onClick={() => dispatch(toggleAppearance())}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative p-2 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-all duration-200 cursor-pointer overflow-hidden border border-surface-300 dark:border-[#5D5246]"
    >
      <span
        className={`block transition-all duration-300 ${
          isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute inset-2'
        }`}
      >
        <Sun className="w-5 h-5" />
      </span>
      <span
        className={`block transition-all duration-300 ${
          isDark ? 'rotate-90 opacity-0 absolute inset-2' : 'rotate-0 opacity-100'
        }`}
      >
        <Moon className="w-5 h-5" />
      </span>
    </button>
  );
};

export default AppearanceToggle;
