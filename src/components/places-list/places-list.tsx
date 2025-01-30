import { JSX, useState } from 'react';
import PlaceCard from '../place-card/place-card.tsx';
import { Offer } from '../../types/offer.ts';
import { Setting } from '../../const.ts';

type PlacesListProps = {
  isNearby?: boolean;
  places: Offer[];
  onListItemHover: (offerId: string | null) => void;
}

function PlacesList({ places, onListItemHover, isNearby }: PlacesListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  let placesList: Offer[] = [];
  if (isNearby) {
    placesList = places.slice(0, Setting.NeighbourhoodCount);
  } else {
    placesList = places;
  }
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
          variant={'cities'}
        />
      ))}
    </div>
  );
}

export default PlacesList;
