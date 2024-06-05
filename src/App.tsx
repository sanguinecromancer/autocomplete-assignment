import { useEffect, useState } from 'react';
import AutoComplete from './Components/AutoComplete';
import './App.css';
import loadAllCharacters from './api/api';

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



function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);


  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await loadAllCharacters();
        setCharacters(allCharacters);
      } catch (error) {
        setError('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (loading) {
    return (
      <main aria-busy="true" role="progressbar">
        <div className="loading" aria-label="Loading content, please wait..."></div>
      </main>
    );
  }

  if (error || !characters || characters.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Characters Available</h2>
          <button className='btn' onClick={handleRefresh}>
            refresh
          </button>
        </div>
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
