import Locations from '../locations/locations.tsx';
import Places from '../places/places.tsx';
import { cities } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer.ts';
import { getCity } from '../../store/places-process/selectors.ts';
import cn from 'classnames';

type MainPageContentProps = {
  offers: Offer[];
};

function MainPageContent({ offers }: MainPageContentProps) {
  const city = useAppSelector(getCity);
  const points: Offer[] = offers.filter((offer) => offer.city.name === city.name);
  const pointsCount = points.length;
  return (
    <main className={cn(
      'page__main',
      'page__main--index',
      { 'page__main--index-empty': pointsCount === 0 }
    )}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Locations locations={cities}/>
      <Places points={points} city={city}/>
    </main>
  );
}

export default MainPageContent;
