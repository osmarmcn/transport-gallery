import axios from "axios";
import { useEffect, useState } from "react";
import './theme/global.css';
import { Header } from "./components/header/header";
import { CardVeiculo } from "./components/cards/cards";
import { GaleriaModal } from "./components/modal/GaleriaModal"; // certifique-se que esse caminho está certo

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

interface VeiculoData {
  veiculo?: Veiculo;
  imagens?: Imagem[];
  tags?: string[];
}

function App() {
  const [veiculos, setVeiculos] = useState<VeiculoData[]>([]);
  const [veiculosFiltrados, setVeiculosFiltrados] = useState<VeiculoData[]>([]);
  const [selectedImages, setSelectedImages] = useState<Imagem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        const { data } = await axios.get("/db.json");
        setVeiculos(data.veiculos || []);
        setVeiculosFiltrados(data.veiculos || []);
      } catch (error) {
        console.error("Erro ao carregar db.json:", error);
      }
    }

    carregarVeiculos();
  }, []);

  function handleSearch(value: string) {
    if (!value) {
      setVeiculosFiltrados(veiculos);
      return;
    }

    const termo = value.toLowerCase();

    const filtrados = veiculos.filter(v =>
      v.tags?.some(tag => tag.toLowerCase().includes(termo))
    );

    setVeiculosFiltrados(filtrados);
  }

  function openModal(imagens: Imagem[]) {
    setSelectedImages(imagens);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedImages([]);
  }

  return (
    <>
      <Header onSearch={handleSearch} />

      <section className="container">
        {veiculosFiltrados.length > 0 ? (
          veiculosFiltrados
            .filter(v => v.veiculo && v.imagens && v.imagens.length > 0)
            .map((v, i) => (
              <CardVeiculo
                key={i}
                veiculo={v.veiculo}
                imagem={v.imagens![0]}
                onClick={() => openModal(v.imagens!)}
              />
            ))
        ) : (
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Nenhum veículo encontrado com esse termo.
          </p>
        )}
      </section>

      {isModalOpen && (
        <GaleriaModal imagens={selectedImages} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
