/**
 * Workspace Flow — CommandCenterView (Dashboard)
 * @author Abdelfatah
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PenSquare, LayoutGrid } from 'lucide-react';
import { useBrowseItems } from '@/modules/workspace/hooks/useWorkspaceCollection';
import StatsOverview     from '../widgets/StatsOverview';
import RecentItems       from '../widgets/RecentItems';
import QuickActions      from '../widgets/QuickActions';
import CategoryBreakdown from '../widgets/CategoryBreakdown';
import PinnedItems       from '../widgets/PinnedItems';
import ActionButton      from '@/shared/components/ActionButton';

/* ─── Skeleton ─────────────────────────────────────────────────────────── */
const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-36 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-[#5D5246]" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-[#5D5246]" />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 h-56 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-[#5D5246]" />
      <div className="h-56 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-[#5D5246]" />
    </div>
  </div>
);

/* ─── Main View ─────────────────────────────────────────────────────────── */
const CommandCenterView = () => {
  const account = useSelector((s) => s.identity.account);
  const { data, isLoading, isError, refetch } = useBrowseItems({});

  const items = data?.data || [];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-danger-500 font-semibold mb-3">Failed to load dashboard data.</p>
        <ActionButton variant="outline" onClick={() => refetch()}>Retry</ActionButton>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">

      {/* ── Welcome Banner ─────────────────────────────────────────────── */}
      <div className="vintage-card p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-surface-400 dark:text-surface-500 text-sm font-body mb-1">{today}</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-surface-800 dark:text-paper-50 mb-1">
            {greeting()}, {account?.name?.split(' ')[0] || 'there'}!
          </h2>
          <p className="text-surface-500 dark:text-surface-500 text-sm font-body mb-5">
            You have <span className="font-bold text-surface-700 dark:text-paper-50">{items.length}</span> note{items.length !== 1 ? 's' : ''} in your notebook.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/notes/new">
              <ActionButton variant="primary" size="sm" icon={PenSquare}>
                New Note
              </ActionButton>
            </Link>
            <Link to="/notes">
              <ActionButton variant="secondary" size="sm" icon={LayoutGrid}>
                Browse All
              </ActionButton>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <StatsOverview items={items} />

      {/* ── Middle Row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentItems items={items} />
        </div>
        <div className="flex flex-col gap-4">
          <QuickActions />
          <CategoryBreakdown items={items} />
        </div>
      </div>

      {/* ── Pinned ─────────────────────────────────────────────────────── */}
      <PinnedItems items={items} />

    </div>
  );
};

export default CommandCenterView;
