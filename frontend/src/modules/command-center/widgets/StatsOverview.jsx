/**
 * Workspace Flow — StatsOverview Widget
 * @author Abdelfatah
 * 4-card stat grid displayed on the Command Center dashboard.
 */

import React from 'react';
import { FileText, Pin, Globe, Lock } from 'lucide-react';

const STAT_CARDS = [
  {
    label:   'Total Notes',
    icon:    FileText,
    getValue: (items) => items.length,
  },
  {
    label:   'Pinned',
    icon:    Pin,
    getValue: (items) => items.filter((n) => n.is_pinned).length,
  },
  {
    label:   'Public',
    icon:    Globe,
    getValue: (items) => items.filter((n) => n.status === 'public').length,
  },
  {
    label:   'Private',
    icon:    Lock,
    getValue: (items) => items.filter((n) => n.status === 'private').length,
  },
];

const StatsOverview = ({ items = [] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {STAT_CARDS.map(({ label, icon: Icon, getValue }) => (
      <div
        key={label}
        className="vintage-card p-5 flex items-center gap-4 card-hover"
      >
        <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 shrink-0">
          <Icon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-heading font-bold text-surface-800 dark:text-paper-50 leading-none">
            {getValue(items)}
          </p>
          <p className="text-xs font-body text-surface-500 dark:text-surface-500 font-medium mt-0.5 truncate">
            {label}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default StatsOverview;
