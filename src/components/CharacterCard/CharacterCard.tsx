// Dependencies
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
// Types
import CharacterType from '../../types/characterType';
// Styles
import './CharacterCard.scss';
import 'react-loading-skeleton/dist/skeleton.css';

interface CharacterCardProps {
  character: CharacterType;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="character-card">
      {!loaded && (
        <div className="character-card__skeleton-image">
          <Skeleton
            height={'100%'}
            baseColor="#839EB3"
            enableAnimation
          />
        </div>
      )}
      <img
        className="character-card__image"
        src={character.image}
        alt={character.name}
        onLoad={() => setLoaded(true)}
      />
      <div className="character-card__details">
        {!loaded ? (
          <Skeleton count={3} enableAnimation baseColor="#839EB3" />
        ) : (
          <>
            <h5>
              <span>Name:</span> {character.name}
            </h5>
            <h5>
              <span>Species:</span> {character.species}
            </h5>
            <h5>
              <span>Status:</span> {character.status}
            </h5>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
