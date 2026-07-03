/**
 * Workspace Flow — QuickActions Widget
 * @author Abdelfatah
 * Dashboard shortcut cards for common actions.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, LayoutGrid, Pin } from 'lucide-react';

const ACTIONS = [
  {
    label:    'Compose',
    desc:     'Write a new item',
    icon:     PenSquare,
    to:       '/notes/new',
    gradient: 'from-primary-600 to-violet-600',
    shadow:   'shadow-primary-500/30',
  },
  {
    label:    'Browse All',
    desc:     'Explore workspace',
    icon:     LayoutGrid,
    to:       '/notes',
    gradient: 'from-accent-500 to-teal-500',
    shadow:   'shadow-accent-500/30',
  },
  {
    label:    'Pinned',
    desc:     'View pinned items',
    icon:     Pin,
    to:       '/notes?status=pinned',
    gradient: 'from-violet-500 to-purple-600',
    shadow:   'shadow-violet-500/30',
  },
];

const QuickActions = () => (
  <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-5 shadow-sm">
    <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
    <div className="space-y-2">
      {ACTIONS.map(({ label, desc, icon: Icon, to, gradient, shadow }) => (
        <Link
          key={label}
          to={to}
          className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-md ${shadow} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
        >
          <div className="p-1.5 rounded-lg bg-white/20">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">{label}</p>
            <p className="text-xs text-white/70">{desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
