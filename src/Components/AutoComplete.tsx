import { useState } from 'react';
import { Character } from '../App';

interface AutoCompleteProps {
  characters: Character[];
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ characters }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (value.length > 0) {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <section className="container">
      <div className="group">
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            value={search}
            onChange={handleChange}
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(character => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AutoComplete;
