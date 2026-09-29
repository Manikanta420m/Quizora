import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm shadow-blue-500/20 active:scale-[0.98] transition-colors',
  secondary: 'bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:border-[#2563EB] active:scale-[0.98] transition-colors shadow-xs',
  outline: 'bg-transparent hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:border-[#2563EB] active:scale-[0.98] transition-colors',
  ghost: 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors',
  danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-sm shadow-red-500/20 active:scale-[0.98] transition-colors',
  gradient: 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:opacity-95 text-white shadow-sm shadow-blue-500/20 active:scale-[0.98] transition-opacity',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
};

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {children}
    </button>
  );
}

export default Button;
