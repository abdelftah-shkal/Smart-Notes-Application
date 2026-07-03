/**
 * Workspace Flow — StatsOverview Widget
 * @author Abdelfatah
 * 4-card stat grid displayed on the Command Center dashboard.
 */

import React from 'react';
import { FileText, Pin, Globe, Lock } from 'lucide-react';

const STAT_CARDS = [
  {
    label:   'Total Items',
    icon:    FileText,
    color:   'from-primary-500 to-violet-600',
    bgLight: 'bg-primary-50 dark:bg-primary-950/30',
    textColor: 'text-primary-600 dark:text-primary-400',
    getValue: (items) => items.length,
  },
  {
    label:   'Pinned',
    icon:    Pin,
    color:   'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textColor: 'text-violet-600 dark:text-violet-400',
    getValue: (items) => items.filter((n) => n.is_pinned).length,
  },
  {
    label:   'Public',
    icon:    Globe,
    color:   'from-accent-500 to-teal-500',
    bgLight: 'bg-accent-50 dark:bg-accent-500/10',
    textColor: 'text-accent-600 dark:text-accent-400',
    getValue: (items) => items.filter((n) => n.status === 'public').length,
  },
  {
    label:   'Private',
    icon:    Lock,
    color:   'from-warning-400 to-orange-500',
    bgLight: 'bg-warning-50 dark:bg-warning-400/10',
    textColor: 'text-warning-500 dark:text-warning-400',
    getValue: (items) => items.filter((n) => n.status === 'private').length,
  },
];

const StatsOverview = ({ items = [] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {STAT_CARDS.map(({ label, icon: Icon, bgLight, textColor, getValue }) => (
      <div
        key={label}
        className="glass-card dark:bg-surface-900/60 rounded-2xl p-5 flex items-center gap-4 card-hover shadow-sm"
      >
        <div className={`p-3 rounded-xl ${bgLight} shrink-0`}>
          <Icon className={`w-5 h-5 ${textColor}`} />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-extrabold text-surface-900 dark:text-white leading-none">
            {getValue(items)}
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400 font-medium mt-0.5 truncate">
            {label}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default StatsOverview;
