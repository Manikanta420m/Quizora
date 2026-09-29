'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useSound } from '@/context/SoundContext';

/**
 * Modern SaaS Theme Switch Button (Dark / Light Mode Toggle)
 * Features tactile sliding animation, dual-state track icons, accessible ARIA attributes,
 * and integrated sound chime.
 */
export function ThemeSwitch({
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  className = '',
}) {
  const { isDark, toggleTheme, mounted } = useTheme();
  const { playSound } = useSound();

  // Prevent SSR hydration mismatch by falling back safely until mounted
  const activeDark = mounted ? isDark : false;

  const handleClick = (e) => {
    e.stopPropagation();
    try {
      playSound('click');
    } catch (_) {}
    toggleTheme();
  };

  // Dimensions configuration by size
  const sizes = {
    sm: {
      track: 'w-12 h-6 p-0.5',
      thumb: 'w-5 h-5',
      translate: activeDark ? 'translate-x-6' : 'translate-x-0',
      iconTrack: 'w-3 h-3',
      iconThumb: 'w-3 h-3',
      text: 'text-xs',
    },
    md: {
      track: 'w-[58px] h-[30px] p-[3px]',
      thumb: 'w-6 h-6',
      translate: activeDark ? 'translate-x-[28px]' : 'translate-x-0',
      iconTrack: 'w-3.5 h-3.5',
      iconThumb: 'w-3.5 h-3.5',
      text: 'text-xs',
    },
    lg: {
      track: 'w-16 h-8 p-1',
      thumb: 'w-6 h-6',
      translate: activeDark ? 'translate-x-8' : 'translate-x-0',
      iconTrack: 'w-4 h-4',
      iconThumb: 'w-4 h-4',
      text: 'text-sm',
    },
  };

  const currentSize = sizes[size] || sizes.md;

  const switchButton = (
    <button
      type="button"
      role="switch"
      aria-checked={activeDark}
      aria-label={activeDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={activeDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onClick={handleClick}
      className={`relative inline-flex items-center shrink-0 cursor-pointer rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
        currentSize.track
      } ${
        activeDark
          ? 'bg-[#0F172A] border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
          : 'bg-slate-200/90 hover:bg-slate-300/80 border border-slate-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      {/* Background Track Icons (Sun on Left, Moon on Right) */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun
          className={`${currentSize.iconTrack} transition-opacity duration-200 ${
            activeDark ? 'opacity-30 text-slate-400' : 'opacity-90 text-amber-500'
          }`}
        />
        <Moon
          className={`${currentSize.iconTrack} transition-opacity duration-200 ${
            activeDark ? 'opacity-90 text-sky-400' : 'opacity-30 text-slate-400'
          }`}
        />
      </div>

      {/* Sliding Tactile Knob / Thumb */}
      <span
        className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          currentSize.thumb
        } ${currentSize.translate} ${
          activeDark
            ? 'bg-[#131B2E] border border-sky-400/50 shadow-[0_2px_8px_rgba(56,189,248,0.35)] text-sky-400'
            : 'bg-white border border-amber-200/60 shadow-[0_2px_6px_rgba(0,0,0,0.15)] text-amber-500'
        }`}
      >
        {activeDark ? (
          <Moon
            className={`${currentSize.iconThumb} fill-sky-400/20 stroke-sky-400 transition-transform duration-300 -rotate-12`}
          />
        ) : (
          <Sun
            className={`${currentSize.iconThumb} fill-amber-500/20 stroke-amber-500 transition-transform duration-300 rotate-0`}
          />
        )}
      </span>
    </button>
  );

  if (!showLabel) {
    return switchButton;
  }

  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {labelPosition === 'left' && (
        <span
          className={`font-semibold transition-colors duration-200 ${currentSize.text} ${
            activeDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
          }`}
        >
          {activeDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
      {switchButton}
      {labelPosition === 'right' && (
        <span
          className={`font-semibold transition-colors duration-200 ${currentSize.text} ${
            activeDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
          }`}
        >
          {activeDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </div>
  );
}

export default ThemeSwitch;
