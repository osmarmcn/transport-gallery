import React from 'react';
import styles from './GaleriaModal.module.css';

interface Imagem {
  arquivo: string;
  descricao?: string;
}

interface GaleriaModalProps {
  imagens: Imagem[];
  onClose: () => void;
}

export const GaleriaModal: React.FC<GaleriaModalProps> = ({ imagens, onClose }) => {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Fecha somente se clicar fora do conteúdo do modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {imagens.length > 1 ? (
          <div className={styles.imageGrid}>
            {imagens.map((img, index) => (
              <img key={index} src={`/images/${img.arquivo}`} alt={img.descricao || 'Imagem do veículo'} className={styles.image} />
            ))}
          </div>
        ) : (
          <div className={styles.singleImageWrapper}>
            <img src={`/images/${imagens[0].arquivo}`} alt={imagens[0].descricao || 'Imagem do veículo'} className={styles.image} />
          </div>
        )}
      </div>
    </div>
  );
};
