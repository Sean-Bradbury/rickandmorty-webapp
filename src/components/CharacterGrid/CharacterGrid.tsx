// Dependencies
import { useAutoAnimate } from '@formkit/auto-animate/react';
// Components
import CharacterCard from '../CharacterCard';
// Types
import CharacterType from '../../types/characterType';
// Styles
import './CharacterGrid.scss';

interface CharacterGridProps {
  filteredCharacters: CharacterType[];
  error: string;
}

const CharacterGrid = ({
  filteredCharacters,
  error,
}: CharacterGridProps) => {
  const [parent] = useAutoAnimate();
  return (
    <div className="character-grid" ref={parent}>
      {error && <p>{error}</p>}
      {filteredCharacters.map((character: CharacterType) => (
        <div className="character-grid__item" key={character.id}>
          <CharacterCard character={character} />
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
