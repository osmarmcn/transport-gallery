import React from 'react';
import styles from './CardVeiculo.module.css';

interface Veiculo {
  tipo: string;
  fabricante: string;
  modelo: string;
  cor: string;
  uso: string;
  carroceria: string;
  combustivel: string;
}

interface Imagem {
  arquivo: string;
  angulo?: string;
  descricao?: string;
}

interface CardVeiculoProps {
  veiculo?: Veiculo;
  imagem?: Imagem;
  onClick?: () => void;
}

export const CardVeiculo: React.FC<CardVeiculoProps> = ({ veiculo, imagem, onClick }) => {
  if (!veiculo || !imagem) return null;

  return (
    <div className={styles.card} onClick={onClick}>
      <img
        className={styles.foto}
        src={`/images/${imagem.arquivo}`}
        alt={imagem.descricao || 'Imagem do veículo'}
      />
      <div className={styles.overlay}>
        <h2>{veiculo.fabricante} - {veiculo.modelo}</h2>
        <p><strong>Tipo:</strong> {veiculo.tipo}</p>
        <p><strong>Carroceria:</strong> {veiculo.carroceria}</p>
        <p><strong>Uso:</strong> {veiculo.uso}</p>
        <p><strong>Combustível:</strong> {veiculo.combustivel}</p>
      </div>
    </div>
  );
};
