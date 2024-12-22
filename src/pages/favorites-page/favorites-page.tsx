import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import FavoriteLocation from '../../components/favorite-location/favorite-location.tsx';

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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href={'main.html'}>
                <img className="header__logo" src={'img/logo.svg'} alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
