import { JSX, useState } from 'react';
import { City, Offer } from '../../types/offer.ts';
import { SortType, Setting } from '../../const.ts';
import PlacesSort from '../places-sort/places-sort.tsx';
import PlacesList from '../places-list/places-list.tsx';
import Map from '../map/map.tsx';
import { sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating } from '../../utils.ts';

type PlacesProps = {
  offers: Offer[];
  city: City;
}

function Places({ offers, city }: PlacesProps): JSX.Element {
  const placeCardCount = Setting.PlaceCardCount;
  const points: Offer[] = offers.filter((offer) => offer.city.name === city.name);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [currentOption, setCurrentOption] = useState<SortType>(SortType.Popular);

  const handleListItemHover = (listItemNameId: string | null) => {
    const currentPoint: Offer | undefined = points.find((point) =>
      point.id === listItemNameId,
    );
    if (currentPoint) {
      setSelectedPointId(currentPoint.id);
    } else {
      setSelectedPointId(null);
    }
  };

  const sortedPoints = (() => {
    switch (currentOption) {
      case SortType.PriceLowToHigh:
        return sortOffersByPriceAscending(points);
      case SortType.PriceHighToLow:
        return sortOffersByPriceDescending(points);
      case SortType.TopRatedFirst:
        return sortOffersByRating(points);
      default:
        return points;
    }
  })();

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{points.length} places to stay in {city.name}</b>
          <PlacesSort
            currentOption={currentOption}
            onOptionChange={setCurrentOption}
          />
          <PlacesList
            placeCardCount={placeCardCount}
            places={sortedPoints}
            onListItemHover={handleListItemHover}
          />
        </section>
        <div className="cities__right-section">
          <Map key={city.name} city={city.location} points={points} selectedPointId={selectedPointId} variant={'cities'}/>
        </div>
      </div>
    </div>
  );
}

export default Places;
