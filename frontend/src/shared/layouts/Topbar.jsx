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
  '/':           'Command Center',
  '/notes':      'Workspace',
  '/notes/new':  'Compose New Item',
  '/profile':    'My Account',
};

const getPageTitle = (pathname) => {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  if (pathname.includes('/edit')) return 'Revise Item';
  if (pathname.match(/\/notes\/[^/]+$/)) return 'Item Details';
  return 'Workspace Flow';
};

const Topbar = ({ onMenuToggle }) => {
  const location = useLocation();
  const account  = useSelector((s) => s.identity.account);
  const title    = getPageTitle(location.pathname);

  const initials = account?.name
    ? account.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WF';

  return (
    <header className="glass-topbar sticky top-0 z-20 flex items-center justify-between h-16 px-4 lg:px-6">
      {/* Left — Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-surface-900 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-3">
        <AppearanceToggle />

        {/* Avatar */}
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 text-white text-sm font-bold shadow-sm select-none">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
