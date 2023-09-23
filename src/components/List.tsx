import { useState, useEffect } from 'react';
import styles from './list.module.css';

export function List() {
  const [pokemons, setPokemons] = useState({ results: [] });
  const [pesquisa, setpesquisa] = useState('');
  const [filterpk, setfilterpk] = useState(null);

  const fetchPokemons = async (filter = '') => {
    try {
      let url;

      if (filter) {
        // Para adicionar o filtro a URL
        url = `https://pokeapi.co/api/v2/pokemon/${filter.toLowerCase()}`;
      } else {
        url = 'https://pokeapi.co/api/v2/pokemon?limit=350';
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Falha ao buscar os dados');
      }

      const data = await response.json();
      console.log(data);

      if (filter) {
        setfilterpk(data);
      } else {
        setPokemons(data);
        setfilterpk(name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSearch = () => {
    fetchPokemons(pesquisa);
  };
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png

  return (
    <div>
      <h2 className={styles.title}>Pokemons de Kanto</h2>
      <div className={styles.pesquisa}>
        <input
          type="text"
          value={pesquisa}
          className={styles.campo_pesquisa}
          placeholder="Digite o nome ou o codigo Pokemon !"
          onChange={(e) => setpesquisa(e.target.value)}
        />
        <button className={styles.btn_pesquisa} onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
      <ol className={styles.list}>
        {pokemons.results.map((pokemon, index) => (
          <li key={filterpk.id}>
            <span>{filterpk.name}</span>
            <a>
              <img
                alt={pokemons.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
