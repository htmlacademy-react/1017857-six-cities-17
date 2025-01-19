import { JSX, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import PlacesList from '../../components/places-list/places-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import { useAppSelector } from '../../hooks';
import Locations from '../../components/locations/locations.tsx';
import { cities } from '../../const.ts';
import PlacesSort from '../../components/places-sort/places-sort.tsx';
import { SortType } from '../../const.ts';
import { sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating } from '../../utils.ts';

type MainPageProps = {
  placeCardCount: number;
  offers: Offer[];
};

function MainPage({ placeCardCount, offers }: MainPageProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
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
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations locations={cities} />
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
              <Map key={city.name} city={city.location} points={points} selectedPointId={selectedPointId} variant={'cities'} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
