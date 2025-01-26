import { JSX, useState } from 'react';
import { City, Offer } from '../../types/offer.ts';
import Map from '../map/map.tsx';
import PlacesSection from '../places-section/places-section.tsx';
import NoPlacesSection from '../no-places-secton/no-places-section.tsx';
import cn from 'classnames';

type PlacesProps = {
  offers: Offer[];
  city: City;
}

function Places({ offers, city }: PlacesProps): JSX.Element {
  const points: Offer[] = offers.filter((offer) => offer.city.name === city.name);
  const pointsCount = points.length;
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const handleListItemHover = (id: string | null) => {
    setSelectedPointId(id);
  };
  return (
    <div className="cities">
      <div className={cn(
        'cities__places-container',
        { 'cities__places-container--empty': pointsCount === 0 },
        'container'
      )}
      >
        {pointsCount > 0 ?
          <PlacesSection points={points} city={city} onListItemHover={handleListItemHover} /> :
          <NoPlacesSection city={city.name} />}
        <div className="cities__right-section">
          {pointsCount > 0 && <Map key={city.name} city={city.location} points={points} selectedPointId={selectedPointId} variant={'cities'}/>}
        </div>
      </div>
    </div>
  );
}

export default Places;
