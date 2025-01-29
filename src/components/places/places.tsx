import { JSX, useState } from 'react';
import { City, Offer } from '../../types/offer.ts';
import Map from '../map/map.tsx';
import PlacesSection from '../places-section/places-section.tsx';
import NoPlacesSection from '../no-places-secton/no-places-section.tsx';
import cn from 'classnames';
import {Setting} from "../../const.ts";

type PlacesProps = {
  points: Offer[];
  city: City;
}

function Places({ points, city }: PlacesProps): JSX.Element {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const pointsCount = points.length;
  const pointsList = points.slice(0, Setting.PlaceCardCount);
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
          <PlacesSection points={pointsList} city={city} onListItemHover={handleListItemHover} /> :
          <NoPlacesSection city={city.name} />}
        <div className="cities__right-section">
          {pointsCount > 0 && <Map key={city.name} city={city.location} points={pointsList} selectedPointId={selectedPointId} variant={'cities'}/>}
        </div>
      </div>
    </div>
  );
}

export default Places;
