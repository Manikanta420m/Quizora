import React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
  default: 'bg-[#F1F5F9] text-[#0F172A] border-[#E2E8F0]',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  info: 'bg-sky-50 text-[#0284C7] border-sky-200',
  ai: 'bg-sky-50 text-[#0369A1] border-[#38BDF8]/50 shadow-xs',
  indigo: 'bg-blue-50 text-[#2563EB] border-blue-200',
  purple: 'bg-blue-50 text-[#2563EB] border-blue-200',
  navy: 'bg-[#0F172A] text-white border-[#0F172A]',
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
