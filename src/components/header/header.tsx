import React, { useState } from 'react';
import styles from './Header.module.css';
import { FaSearch } from 'react-icons/fa';

interface HeaderProps {
  onSearch: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit() {
    onSearch(inputValue.trim());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleReset() {
    setInputValue('');
    onSearch('');
  }

  function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isDark = !e.target.checked;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo} onClick={handleReset}>
        Galeria de Veículos
      </h1>

      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Pesquisar veículos (ônibus, van, caminhão...)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.pesquisa}
          />
          <button className={styles.searchBtn} onClick={handleSubmit} title="Buscar">
            <FaSearch />
          </button>
        </div>

        <label className={styles.toggle}>
          <input type="checkbox" onChange={handleThemeChange} />
          <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>
          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
    </header>
  );
};
