import { JSX } from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

type NeighbourhoodProps = {
  places: Offer[];
}

function Neighbourhood({ places }: NeighbourhoodProps): JSX.Element {

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {places.map((place: Offer) => (
            <PlaceCard
              key={place.id}
              place={place}
              variant={'near'}
            />
          ))};
        </div>
      </section>
    </div>
  );
}

export default Neighbourhood;
