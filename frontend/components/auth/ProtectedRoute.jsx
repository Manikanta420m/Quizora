'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Route Guard Component
 * Protects pages from unauthorized access, redirecting to /login when unauthenticated.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
        <p className="text-sm text-[#64748B]">Verifying authentication session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
