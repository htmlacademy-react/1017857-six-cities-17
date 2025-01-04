import PlaceCard from '../place-card/place-card.tsx';
import { Offer } from '../../types/offer.ts';

type FavoriteLocationProps = {
  city: string;
  offers: Offer[];
}

function FavoriteLocation({ city, offers }: FavoriteLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <PlaceCard key={offer.id} place={offer} variant={'favorites'}/>)}
      </div>
    </li>
  );
}

export default FavoriteLocation;
