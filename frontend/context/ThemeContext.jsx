'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

function applyThemeToDOM(newTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (newTheme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
}

function subscribeToTheme(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('quizora-theme-change', callback);
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('quizora-theme-change', callback);
    mql.removeEventListener('change', callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('quizora-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (_) {
    return 'light';
  }
}

function getServerSnapshot() {
  return 'light';
}

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    try {
      localStorage.setItem('quizora-theme', newTheme);
    } catch (_) {}
    applyThemeToDOM(newTheme);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('quizora-theme-change'));
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
