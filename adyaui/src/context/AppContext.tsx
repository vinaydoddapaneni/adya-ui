import React, { useState, useEffect } from 'react';
import type { Framework, Theme } from './AppContext.types';
import { AppContext } from './AppContext.context';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize framework from localStorage or default to 'react'
  const [framework, setFrameworkState] = useState<Framework>(() => {
    const saved = localStorage.getItem('adyaui-framework');
    return (saved as Framework) || 'react';
  });

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('adyaui-theme');
    if (saved) return saved as Theme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Update localStorage and apply theme when framework changes
  useEffect(() => {
    localStorage.setItem('adyaui-framework', framework);
  }, [framework]);

  // Update localStorage and apply theme when theme changes
  useEffect(() => {
    localStorage.setItem('adyaui-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setFramework = (newFramework: Framework) => {
    setFrameworkState(newFramework);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ framework, setFramework, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
