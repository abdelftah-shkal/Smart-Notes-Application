/**
 * Workspace Flow — Topbar
 * @author Abdelfatah
 * Sticky glassmorphic top bar with menu toggle, page title, and user controls.
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AppearanceToggle from '@/shared/components/AppearanceToggle';
import { useSelector } from 'react-redux';

const ROUTE_TITLES = {
  '/':           'Dashboard',
  '/notes':      'Notes',
  '/notes/new':  'New Note',
  '/profile':    'Profile',
};

const getPageTitle = (pathname) => {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  if (pathname.includes('/edit')) return 'Edit Note';
  if (pathname.match(/\/notes\/[^/]+$/)) return 'Note';
  return 'Notebook';
};

const Topbar = ({ onMenuToggle }) => {
  const location = useLocation();
  const account  = useSelector((s) => s.identity.account);
  const title    = getPageTitle(location.pathname);

  const initials = account?.name
    ? account.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WF';

  return (
    <header className="bg-surface-100 dark:bg-surface-900 border-b border-surface-300 dark:border-[#5D5246] sticky top-0 z-20 flex items-center justify-between h-16 px-4 lg:px-6">
      {/* Left — Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-paper-50 hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-heading font-bold text-surface-800 dark:text-paper-50">
          {title}
        </h1>
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-3">
        <AppearanceToggle />

        {/* Avatar */}
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-800 dark:bg-surface-700 border border-surface-400 dark:border-surface-600 text-paper-50 text-sm font-heading font-bold select-none">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
