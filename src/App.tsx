import axios from "axios";
import { useEffect, useState } from "react";

import './theme/global.css';
import { Header } from "./components/header/header";
import { CardVeiculo } from "./components/cards/cards";

interface Veiculo {
  tipo: string;
  fabricante: string;
  modelo: string;
  cor: string;
  carroceria: string;
  uso: string;
  combustivel: string;
}

interface Imagem {
  arquivo: string;
  angulo: string;
  descricao: string;
}

interface VeiculoCompleto {
  veiculo: Veiculo;
  imagens: Imagem[];
}

function App() {
  const [veiculos, setVeiculos] = useState<VeiculoCompleto[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const { data } = await axios.get("/db.json");
        setVeiculos(data.veiculos);
      } catch (error) {
        console.error("Erro ao carregar db.json:", error);
      }
    }

    carregarDados();
  }, []);

  return (
    <>
      <Header onSearch={() => {}} />
      <section className="container">
      {veiculos.length > 0 ? (
        veiculos
          .filter((item) => Array.isArray(item.imagens) && item.imagens.length > 0)
          .map((item, index) => (
            <CardVeiculo
              key={index}
              veiculo={item.veiculo}
              imagem={item.imagens[0]}
            />
          ))
      ) : (
        <p>Nenhum veículo encontrado.</p>
      )}

      </section>
    </>
  );
}

export default App;
