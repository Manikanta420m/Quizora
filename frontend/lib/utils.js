import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge conditional class names with Tailwind CSS cleanly.
 * Beginner tip: 'clsx' handles conditional classes ({ 'bg-blue-500': isActive }),
 * and 'twMerge' resolves conflicting Tailwind classes (e.g. 'p-4' vs 'p-2').
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
