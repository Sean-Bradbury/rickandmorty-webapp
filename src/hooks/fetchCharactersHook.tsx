import { useState } from 'react';

const useFetchCharacters = () => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async (
    setLoading: (status: boolean) => void,
    setError: (error: string) => void
  ) => {
    setLoading(true);

    const response = await fetch(
      'https://rickandmortyapi.com/api/character'
    );

    if (!response.ok) {
      setError('Something went wrong');
      setLoading(false);
      return;
    }

    const data = await response.json();
    setCharacters(data.results);

    setLoading(false);
  };

  return { characters: characters, fetchCharacters: fetchCharacters };
};

export default useFetchCharacters;
