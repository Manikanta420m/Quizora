'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

/**
 * ConditionalFooter Component
 *
 * Renders the marketing footer only on pages where it is intended (e.g. landing page,
 * public informational pages). Hides the footer on full-height application shells
 * (such as /dashboard, /quizzes/[id]/play, and auth pages) to prevent double-scrollbars
 * and scroll chaining issues where the footer unexpectedly pops up and breaks upward scrolling.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();

  // If pathname is not yet loaded or on dashboard, active quiz taker, or auth screens, hide footer
  if (
    !pathname ||
    pathname.startsWith('/dashboard') ||
    pathname.includes('/play') ||
    pathname === '/login' ||
    pathname === '/register'
  ) {
    return null;
  }

  return (
    <div className="relative z-10">
      <Footer />
    </div>
  );
}
