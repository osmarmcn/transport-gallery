import axios from "axios";
import { useEffect, useState } from "react";

import './theme/global.css';
import { Header } from "./components/header/header";
import { CardPersonagem } from "./components/cards/cards";

interface Personagem {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
}

function App() {
  const [listarPersonagem, setListarPersonagem] = useState<Personagem[]>([]);
  const [pesquisaPersonagem, setPesquisapersonagem] = useState("");

  async function carregarPagina() {
    const { data } = await axios.get("https://rickandmortyapi.com/api/character");
    setListarPersonagem(data.results);
  }

  async function filtrar() {
    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${pesquisaPersonagem}`);
      setListarPersonagem(data.results);
    } catch {
      setListarPersonagem([]);
    }
  }

  useEffect(() => {
    carregarPagina();
  }, []);

  useEffect(() => {
    if (pesquisaPersonagem.trim() !== "") {
      filtrar();
    } else {
      carregarPagina();
    }
  }, [pesquisaPersonagem]);

  return (
    <>
      <Header onSearch={setPesquisapersonagem} />
      <section className="container">
        {listarPersonagem.length > 0 ? (
          listarPersonagem.map((personagem) => (
            <CardPersonagem key={personagem.id} personagem={personagem} />
          ))
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </section>
    </>
  );
}

export default App;
