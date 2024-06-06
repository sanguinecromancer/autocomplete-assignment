import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Character } from '../types';

interface AutoCompleteProps {
  characters: Character[];
}

// let's add a debounce function to limit the rate at which our function is executed
const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ characters }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const dropdownRef = useRef<HTMLDivElement>(null);

	// Memoized handler for changes in the search input
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  }, []);

	// Memoized handler for selection of a character from the suggestions
  const handleSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setSearch('');
    setSuggestions([]);
  }, []);

	// Memoized handler for clicks outside the dropdown to close it
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

	// useEffect to debounce the search input
  useEffect(() => {
    const handler = debounce(async () => {
      setDebouncedSearch(search);
    }, 200);
    handler();
  }, [search]);

	// useEffect to fetch and filter characters based on the debounced search query
	useEffect(() => {
    const fetchFilteredCharacters = async (query: string): Promise<Character[]> => {
      const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      return filteredCharacters;
    };

    const fetchData = async () => {
      if (debouncedSearch.length > 0) {
        const filteredCharacters = await fetchFilteredCharacters(debouncedSearch);
        setSuggestions(filteredCharacters);
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [debouncedSearch, characters]);

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
			<div className='title'>
        <h2>Rick and Morty Characters</h2>
        <div className='title-underline'></div>
      </div>
      <div className="group" ref={dropdownRef}>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            value={search}
            onChange={handleChange}
            placeholder="Search characters"
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(character => (
              <li key={character.id} onClick={() => handleSelect(character)}>
                {getHighlightedText(character.name, debouncedSearch)}
              </li>
            ))}
          </ul>
        )}
      </div>
			{selectedCharacter && (
				<div className="selected-character">
					<p>Selected Character: {selectedCharacter.name}</p>
				</div>
			)}
    </section>
  );
};

export default AutoComplete;