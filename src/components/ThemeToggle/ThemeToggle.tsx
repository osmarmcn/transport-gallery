

import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={!darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <span className={styles.icon}>{darkMode ? '🌙' : '☀️'}</span>
    </label>
  );
};
