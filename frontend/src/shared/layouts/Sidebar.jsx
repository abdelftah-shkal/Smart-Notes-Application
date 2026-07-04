/**
 * Workspace Flow — Sidebar
 * @author Abdelfatah
 * Vertical glassmorphic sidebar with navigation links and logout.
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '@/app/state/globalStore';
import {
  LayoutDashboard,
  FolderOpen,
  PenSquare,
  UserCircle,
  LogOut,
  Zap,
} from 'lucide-react';

const NAV_LINKS = [
  { to: '/',          label: 'Command Center', icon: LayoutDashboard, end: true },
  { to: '/notes',     label: 'Workspace',       icon: FolderOpen      },
  { to: '/notes/new', label: 'Compose',          icon: PenSquare       },
  { to: '/profile',   label: 'Account',          icon: UserCircle      },
];

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const account   = useSelector((s) => s.identity.account);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-surface-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-surface-100 dark:bg-surface-900 border-r border-surface-300 dark:border-[#5D5246] flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-300 dark:border-[#5D5246]">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-800 dark:bg-surface-700 border border-surface-400 dark:border-surface-600">
            <Zap className="w-5 h-5 text-paper-50" />
          </div>
          <div>
            <p className="text-sm font-heading font-bold text-surface-800 dark:text-paper-50 leading-tight">Notebook</p>
            <p className="text-xs font-body text-surface-500 dark:text-surface-500 leading-tight">Journal</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200 ${
                  isActive
                    ? 'bg-surface-200 dark:bg-surface-800 text-surface-800 dark:text-paper-50 border border-surface-300 dark:border-surface-700'
                    : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-paper-50 hover:bg-surface-200/50 dark:hover:bg-surface-800/50'
                }`
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-surface-300 dark:border-[#5D5246] space-y-2">
          {account && (
            <div className="px-3 py-2 rounded-lg bg-surface-200/50 dark:bg-surface-800/50">
              <p className="text-xs font-heading font-semibold text-surface-700 dark:text-paper-50 truncate">{account.name}</p>
              <p className="text-xs font-body text-surface-500 dark:text-surface-500 truncate">{account.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-surface-500 dark:text-surface-400 hover:text-danger-600 dark:hover:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
