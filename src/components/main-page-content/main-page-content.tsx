import Locations from '../locations/locations.tsx';
import Places from '../places/places.tsx';
import { cities } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer.ts';
import { getCity } from '../../store/places-process/selectors.ts';

type MainPageContentProps = {
  offers: Offer[];
};

function MainPageContent({ offers }: MainPageContentProps) {
  const city = useAppSelector(getCity);
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Locations locations={cities}/>
      <Places offers={offers} city={city}/>
    </main>
  );
}

export default MainPageContent;
