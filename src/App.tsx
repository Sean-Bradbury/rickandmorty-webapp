// Dependencies
import { useEffect, useLayoutEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDebounce } from 'use-debounce';
// Components
import CharacterGrid from './components/CharacterGrid';
// Hooks
import useFetchCharacters from './hooks/fetchCharactersHook';
// Styles
import './App.scss';
import CharacterType from './types/characterType';

function App() {
  const { characters, fetchCharacters } = useFetchCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState(
    characters || []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update filtered characters when search term changes
  useLayoutEffect(() => {
    const handleSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);

      if (searchTerm === '') {
        setFilteredCharacters(characters);
        return;
      }

      const filteredCharacters = characters.filter(
        (character: CharacterType) =>
          character.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filteredCharacters);
    };

    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, characters]);

  // Initial characters fetch
  useEffect(() => {
    if (characters.length > 0) return;
    fetchCharacters(setLoading, setError);
  }, [characters, fetchCharacters]);

  return (
    <div className="app-container">
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
        alt="Rick and Morty"
      />
      <input
        className="character-search__input"
        type="text"
        placeholder="Search for a character..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {loading ? (
        <ClipLoader color="#F46150" className="clip-loader" />
      ) : (
        <CharacterGrid
          error={error}
          filteredCharacters={filteredCharacters}
        ></CharacterGrid>
      )}
    </div>
  );
}

export default App;
