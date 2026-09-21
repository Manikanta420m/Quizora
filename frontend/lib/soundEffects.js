/**
 * Procedural Web Audio API Sound Effects Engine
 * Generates synthetic, latency-free audio without any external audio files.
 * Strictly 100% Pure JavaScript (ESM)
 */

let audioCtx = null;
const MUTE_KEY = 'ai_quiz_sound_muted';

/**
 * Lazily initialize and resume AudioContext on user interaction
 */
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
};

/**
 * Check if audio is muted
 */
export const isSoundMuted = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MUTE_KEY) === 'true';
};

/**
 * Set sound mute state
 */
export const setSoundMuted = (muted) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MUTE_KEY, muted ? 'true' : 'false');
};

/**
 * Helper to play a single synthesized tone with exponential decay
 */
const playTone = (freq, type = 'sine', duration = 0.2, gainValue = 0.15, startTimeOffset = 0) => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
};

/**
 * 🔔 Correct Answer Sound: Ascending major triad chime (C5 -> E5 -> G5)
 */
export const playCorrect = () => {
  if (isSoundMuted()) return;
  // C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz)
  playTone(523.25, 'triangle', 0.18, 0.18, 0);
  playTone(659.25, 'triangle', 0.22, 0.18, 0.08);
  playTone(783.99, 'triangle', 0.4, 0.22, 0.16);
};

/**
 * ❌ Incorrect Answer Sound: Low-frequency descending dual-tone buzz
 */
export const playIncorrect = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
};

/**
 * 🔥 Combo Streak Sound: Shimmering ascending arpeggio with high harmonic
 */
export const playStreak = () => {
  if (isSoundMuted()) return;
  // C5, E5, G5, C6 (1046.5Hz)
  playTone(523.25, 'triangle', 0.12, 0.15, 0);
  playTone(659.25, 'triangle', 0.14, 0.15, 0.06);
  playTone(783.99, 'triangle', 0.16, 0.18, 0.12);
  playTone(1046.5, 'sine', 0.45, 0.22, 0.18);
};

/**
 * ⏰ Timer Tick Sound: Crisp wooden clock tick
 */
export const playTimerTick = () => {
  if (isSoundMuted()) return;
  playTone(880, 'sine', 0.04, 0.08, 0);
};

/**
 * 🎺 Badge Unlock Fanfare: Celebratory multi-note royal fanfare
 */
export const playBadgeUnlock = () => {
  if (isSoundMuted()) return;
  // G4 -> C5 -> E5 -> G5 -> C6
  playTone(392.0, 'triangle', 0.15, 0.18, 0);
  playTone(523.25, 'triangle', 0.15, 0.18, 0.12);
  playTone(659.25, 'triangle', 0.18, 0.2, 0.24);
  playTone(783.99, 'triangle', 0.22, 0.22, 0.36);
  playTone(1046.5, 'sine', 0.65, 0.26, 0.48);
  // Harmony note on final chord (E6: 1318.51Hz)
  playTone(1318.51, 'sine', 0.65, 0.18, 0.48);
};

/**
 * 🎴 Card Flip Swoosh: Quick tactile sound for flashcard flip
 */
export const playFlip = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
};

/**
 * 🖱️ Soft Click Sound
 */
export const playClick = () => {
  if (isSoundMuted()) return;
  playTone(1200, 'sine', 0.03, 0.05, 0);
};

const soundEffects = {
  isSoundMuted,
  setSoundMuted,
  playCorrect,
  playIncorrect,
  playStreak,
  playTimerTick,
  playBadgeUnlock,
  playFlip,
  playClick,
};

export default soundEffects;
