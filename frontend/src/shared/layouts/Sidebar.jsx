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
          className="fixed inset-0 z-30 bg-surface-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 glass-sidebar flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/6">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Workspace</p>
            <p className="text-xs text-surface-400 leading-tight">Flow</p>
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
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-600/30 text-primary-300 shadow-sm'
                    : 'text-surface-400 hover:text-white hover:bg-white/6'
                }`
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/6 space-y-2">
          {account && (
            <div className="px-3 py-2 rounded-xl bg-white/4">
              <p className="text-xs font-semibold text-white truncate">{account.name}</p>
              <p className="text-xs text-surface-500 truncate">{account.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-400 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-200 cursor-pointer"
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
