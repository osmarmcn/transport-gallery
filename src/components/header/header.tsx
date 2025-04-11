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
    setInputValue("");
    onSearch(""); // reseta no App.tsx
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo} onClick={handleReset}>
        Projeto Rick and Morty
      </h1>

      <div className={styles.searchWrapper}>
        <input 
          type="text" 
          placeholder="Pesquisar personagem" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown}
          className={styles.pesquisa}
        />
        <button className={styles.searchBtn} onClick={handleSubmit} title="Buscar">
          <FaSearch />
        </button>
      </div>
    </header>
  );
};


