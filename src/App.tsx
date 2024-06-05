import { useEffect, useState } from 'react';
import AutoComplete from './Components/AutoComplete';
import './App.css';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const loadAllCharacters = async (): Promise<Character[]> => {
  try {
    const url = 'http://rickandmortyapi.com/api/character';
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Resource not found (404)');
      } else if (res.status >= 500) {
        throw new Error('Server error, please try again later');
      } else {
        throw new Error(`Unexpected error: ${res.status}`);
      }
    }

    const data = await res.json();
    console.log(data?.results);
    return data?.results;
  } catch (error) {
    console.error('Failed to load characters:', error.message);
    return [];
  }
};


function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAllCharacters();
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main aria-busy="true" role="progressbar">
        <div className="loading" aria-label="Loading content, please wait..."></div>
      </main>
    );
  }

  return (
    <main>
      <AutoComplete characters={characters} />
    </main>
  );
}

export default App;
