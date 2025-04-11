import React from 'react';
import styles from './CardPersonagem.module.css';

interface CardPersonagemProps {
  personagem: {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: { name: string };
  };
}

export const CardPersonagem: React.FC<CardPersonagemProps> = ({ personagem }) => {
  return (
    <div className={styles.card}>
      <img className={styles.foto} src={personagem.image} alt={`Foto de ${personagem.name}`} />
      <h2>Nome: {personagem.name}</h2>
      <p>Espécie: {personagem.species}</p>
      <p>Status: {personagem.status}</p>
      <p>Localização: {personagem.location.name}</p>
    </div>
  );
};


