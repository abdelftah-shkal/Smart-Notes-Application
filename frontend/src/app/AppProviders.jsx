/**
 * Workspace Flow — App Providers
 * @author Abdelfatah
 * Wraps the application with all required global providers.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { globalStore } from './state/globalStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <Provider store={globalStore}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '8px',
                fontFamily: 'Crimson Text, Georgia, serif',
                fontSize: '14px',
                padding: '12px 16px',
              },
              success: {
                style: {
                  background: '#FDF7EC',
                  color: '#2D2A26',
                  border: '1px solid #BFAE92',
                },
              },
              error: {
                style: {
                  background: '#F8ECE8',
                  color: '#8A4438',
                  border: '1px solid #C47060',
                },
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;
