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
    label:    'Write',
    desc:     'Create a new note',
    icon:     PenSquare,
    to:       '/notes/new',
  },
  {
    label:    'Browse',
    desc:     'Explore all notes',
    icon:     LayoutGrid,
    to:       '/notes',
  },
  {
    label:    'Pinned',
    desc:     'View pinned notes',
    icon:     Pin,
    to:       '/notes?status=pinned',
  },
];

const QuickActions = () => (
  <div className="vintage-card p-5">
    <h3 className="text-sm font-heading font-bold text-surface-800 dark:text-paper-50 mb-4">Quick Actions</h3>
    <div className="space-y-2">
      {ACTIONS.map(({ label, desc, icon: Icon, to }) => (
        <Link
          key={label}
          to={to}
          className="flex items-center gap-3 p-3 rounded-lg vintage-card-sm hover:card-hover transition-all duration-200"
        >
          <div className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600">
            <Icon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
          </div>
          <div>
            <p className="text-sm font-heading font-bold text-surface-700 dark:text-paper-50 leading-tight">{label}</p>
            <p className="text-xs font-body text-surface-500 dark:text-surface-500">{desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
