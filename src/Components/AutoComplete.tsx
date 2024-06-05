import { useState, useEffect, useCallback } from 'react';
import { Character } from '../App';

interface AutoCompleteProps {
  characters: Character[];
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ characters }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
	const [debouncedSearch, setDebouncedSearch] = useState(search);


	// using useCallback to make sure the function is memoized and does not unnecessarily re-render
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
	}, []);

	useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch, characters]);

	const handleSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setSearch('');
    setSuggestions([]);
  }, []);

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
              <li key={character.id} onClick={() => handleSelect(character)}>
                {getHighlightedText(character.name, debouncedSearch)}
              </li>
            ))}
          </ul>
        )}
				{selectedCharacter && (
          <div className="selected-character">
            Selected Character: {selectedCharacter.name}
          </div>
        )}

      </div>
    </section>
  );
};

export default AutoComplete;
