'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizzesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?tab=quizzes');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#2563EB]/30 border-t-[#2563EB] animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Redirecting to Quiz Catalog...</p>
      </div>
    </div>
  );
}
