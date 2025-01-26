import { JSX } from 'react';
import { Offer } from '../../types/offer.ts';
import FavoriteLocation from '../favorite-location/favorite-location.tsx';

type FavoritesListProps = {
  favoriteOffers: Offer[];
}

function FavoritesList({ favoriteOffers }: FavoritesListProps): JSX.Element {
  const groupedByCity: Map<string, Offer[]> = favoriteOffers.reduce(
    (acc:Map<string, Offer[]>, offer: Offer) => {
      if (!acc.has(offer.city.name)) {
        acc.set(offer.city.name, []);
      }
      const cityOffers: Offer[] | undefined = acc.get(offer.city.name);
      if (cityOffers) {
        cityOffers.push(offer);
      }
      return acc;
    }, new Map<string, Offer[]>()
  );
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Array.from(groupedByCity, ([city, location]: [string, Offer[]]) => (
          <FavoriteLocation key={city} city={city} offers={location}/>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
