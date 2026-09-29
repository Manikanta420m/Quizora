import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Reusable Input Component
 * Accessible, forwardRef-enabled for React Hook Form, pure JavaScript.
 */
export const Input = forwardRef(
  ({ label, error, helperText, className, id, type = 'text', ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#0F172A]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#111827] placeholder-[#94A3B8] transition-all duration-200 shadow-2xs',
            'focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 focus:border-[#2563EB]',
            error
              ? 'border-[#EF4444] focus:ring-red-500/15 focus:border-[#EF4444]'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#EF4444] font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#64748B]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
