/**
 * Workspace Flow — Main Entry
 * @author Abdelfatah
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppProviders from './app/AppProviders';
import AppShell from './app/AppShell';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <AppShell />
    </AppProviders>
  </StrictMode>
);
