/**
 * Workspace Flow — Application Shell
 * @author Abdelfatah
 * Root router component. Handles session verification and route rendering.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSessionQuery } from '@/modules/identity/hooks/useIdentity';
import PrimaryLayout from '@/shared/layouts/PrimaryLayout';
import SecureGate from '@/shared/components/SecureGate';

// Identity views
import SignInView from '@/modules/identity/views/SignInView';
import EnrollView from '@/modules/identity/views/EnrollView';
import AccountView from '@/modules/identity/views/AccountView';

// Command Center
import CommandCenterView from '@/modules/command-center/views/CommandCenterView';

// Workspace views
import WorkspaceExplorer from '@/modules/workspace/views/WorkspaceExplorer';
import ComposeItemView from '@/modules/workspace/views/ComposeItemView';
import ReviseItemView from '@/modules/workspace/views/ReviseItemView';
import ItemInspector from '@/modules/workspace/views/ItemInspector';

// ─── Session Loader ────────────────────────────────────────────────────────
const SessionLoader = () => {
  const accessToken = useSelector((state) => state.identity.accessToken);
  const { isLoading } = useSessionQuery(!!accessToken);

  if (isLoading && accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-primary-200 dark:border-primary-900 animate-spin border-t-primary-600" />
        </div>
        <p className="mt-5 text-sm text-surface-500 dark:text-surface-400 font-medium">
          Verifying your session…
        </p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<SignInView />} />
      <Route path="/register" element={<EnrollView />} />

      {/* Protected — wrapped in PrimaryLayout (sidebar + topbar) */}
      <Route
        path="/"
        element={
          <SecureGate>
            <PrimaryLayout />
          </SecureGate>
        }
      >
        <Route index element={<CommandCenterView />} />
        <Route path="notes" element={<WorkspaceExplorer />} />
        <Route path="notes/new" element={<ComposeItemView />} />
        <Route path="notes/:id" element={<ItemInspector />} />
        <Route path="notes/:id/edit" element={<ReviseItemView />} />
        <Route path="profile" element={<AccountView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppShell = () => <SessionLoader />;

export default AppShell;
