import PlacesSort from '../places-sort/places-sort.tsx';
import PlacesList from '../places-list/places-list.tsx';
import { SortType } from '../../const.ts';
import { sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating } from '../../utils.ts';
import { useState } from 'react';
import { City, Offer } from '../../types/offer.ts';

type PlacesSectionProps = {
  points: Offer[];
  city: City;
  onListItemHover: (offer: string | null) => void;
}

function PlacesSection({ points, city, onListItemHover }: PlacesSectionProps) {
  const [currentOption, setCurrentOption] = useState<SortType>(SortType.Popular);
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
  const handleListItemHover = (listItemNameId: string | null) => {
    const currentPoint: Offer | undefined = points.find((point) =>
      point.id === listItemNameId,
    );
    if (currentPoint) {
      onListItemHover(currentPoint.id);
    } else {
      onListItemHover(null);
    }
  };
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{points.length} {points.length === 1 ? 'place' : 'places'} to stay in {city.name}</b>
      <PlacesSort
        currentOption={currentOption}
        onOptionChange={setCurrentOption}
      />
      <PlacesList
        places={sortedPoints}
        onListItemHover={handleListItemHover}
      />
    </section>
  );
}

export default PlacesSection;
