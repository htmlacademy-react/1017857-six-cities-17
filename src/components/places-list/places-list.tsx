import { JSX, useState } from 'react';
import PlaceCard from '../place-card/place-card.tsx';
import { Offer } from '../../types/offer.ts';

type PlacesListProps = {
  placeCardCount: number;
  places: Offer[];
  onListItemHover: (offerId: string | null) => void;
}

function PlacesList({ places, placeCardCount, onListItemHover }: PlacesListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const placesList = places.slice(0, placeCardCount);
  const handleListItemHover = (offerId: string | null) => {
    setActiveOffer(offerId);
    onListItemHover(offerId);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {placesList.map((place: Offer) => (
        <PlaceCard
          key={place.id}
          place={place}
          activeId={activeOffer}
          onHover={handleListItemHover}
          variant={'vertical'}
        />
      ))};
    </div>
  );
}

export default PlacesList;
