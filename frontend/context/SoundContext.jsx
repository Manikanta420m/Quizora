'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import soundEffects, { isSoundMuted, setSoundMuted } from '@/lib/soundEffects';

const SoundContext = createContext({
  isMuted: false,
  toggleMute: () => {},
  playSound: () => {},
});

export function SoundProvider({ children }) {
  const [isMuted, setIsMutedState] = useState(() => {
    if (typeof window !== 'undefined') {
      return isSoundMuted();
    }
    return false;
  });

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMutedState(nextState);
    setSoundMuted(nextState);
    if (!nextState) {
      // Play brief pleasant chime when unmuting
      soundEffects.playClick();
    }
  };

  const playSound = (name) => {
    if (isMuted) return;
    switch (name) {
      case 'correct':
        soundEffects.playCorrect();
        break;
      case 'incorrect':
        soundEffects.playIncorrect();
        break;
      case 'streak':
        soundEffects.playStreak();
        break;
      case 'timer':
        soundEffects.playTimerTick();
        break;
      case 'badge':
        soundEffects.playBadgeUnlock();
        break;
      case 'flip':
        soundEffects.playFlip();
        break;
      case 'click':
        soundEffects.playClick();
        break;
      default:
        break;
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
export default SoundContext;
