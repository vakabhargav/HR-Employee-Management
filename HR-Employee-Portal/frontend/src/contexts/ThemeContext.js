import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  const [compactMode, setCompactMode] = useState(() => {
    return localStorage.getItem('compactMode') === 'true';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply compact mode class
    if (compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
    localStorage.setItem('compactMode', compactMode);
  }, [theme, compactMode]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      changeTheme, 
      compactMode, 
      toggleCompactMode,
      setCompactMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
