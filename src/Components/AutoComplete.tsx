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

	const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
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
            placeholder="Search characters"
          />
        </div>
        {suggestions?.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(character => (
              <li key={character.id}>
                {getHighlightedText(character.name, search)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AutoComplete;
