import PlaceCard from '../place-card/place-card.tsx';
import { Offer } from '../../types/offer.ts';
import LocationItem from '../location-item/location-item.tsx';

type FavoriteLocationProps = {
  city: string;
  offers: Offer[];
}

function FavoriteLocation({ city, offers }: FavoriteLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <LocationItem name={city} isActive variant={'favorite'} />
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <PlaceCard key={offer.id} place={offer} variant={'favorites'}/>)}
      </div>
    </li>
  );
}

export default FavoriteLocation;
