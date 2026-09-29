'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { SoundProvider } from '@/context/SoundContext';
import { ThemeProvider } from '@/context/ThemeContext';

/**
 * Root Providers
 * Configures TanStack Query, AuthProvider, SoundProvider, and ThemeProvider.
 * Pure JavaScript, no TypeScript.
 */
export function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10, // Data fresh for 10 seconds
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SoundProvider>{children}</SoundProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
