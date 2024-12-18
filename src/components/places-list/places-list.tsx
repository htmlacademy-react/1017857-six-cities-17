import { JSX, useState } from 'react';
import PlaceCard from '../place-card/place-card.tsx';
import { Offer } from '../../types/offer.ts';

type PlacesListProps = {
  placeCardCount: number;
  places: Offer[];
}

function PlacesList({ places, placeCardCount }: PlacesListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const placesList = places.slice(0, placeCardCount);

  return (
    <div className="cities__places-list places__list tabs__content">
      {placesList.map((place: Offer) => (
        <PlaceCard
          key={place.id}
          place={place}
          activeId={activeOffer}
          onHover={setActiveOffer}
          variant={'vertical'}
        />
      ))};
    </div>
  );
}

export default PlacesList;
