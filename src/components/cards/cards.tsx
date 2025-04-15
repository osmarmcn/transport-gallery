import React from 'react';
import styles from './CardPersonagem.module.css';

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
  angulo: string;
  descricao: string;
}

interface CardVeiculoProps {
  veiculo?: Veiculo;
  imagem?: Imagem;
}

export const CardVeiculo: React.FC<CardVeiculoProps> = ({ veiculo, imagem }) => {
  if (!veiculo || !imagem) return null; // <- 🔒 proteção contra undefined

  return (
    <div className={styles.card}>
      <img
        className={styles.foto}
        src={`/images/${imagem.arquivo}`}
        alt={imagem.descricao}
      />
      <h2>{veiculo.fabricante} - {veiculo.modelo}</h2>
      <p><strong>Tipo:</strong> {veiculo.tipo}</p>
      <p><strong>Carroceria:</strong> {veiculo.carroceria}</p>
      <p><strong>Uso:</strong> {veiculo.uso}</p>
      <p><strong>Combustível:</strong> {veiculo.combustivel}</p>
    </div>
  );
};
