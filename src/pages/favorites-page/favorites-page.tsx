import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import FavoriteLocation from '../../components/favorite-location/favorite-location.tsx';
import Header from '../../components/header/header.tsx';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favoriteOffers: Offer[] = offers.filter((offer) => offer.isFavorite);
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
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Array.from(groupedByCity, ([city, location]: [string, Offer[]]) => (
                <FavoriteLocation key={city} city={city} offers={location}/>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href={'main.html'}>
          <img className="footer__logo" src={'img/logo.svg'} alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
