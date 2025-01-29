import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import FavoritesList from '../../components/favorites-list/favorites-list.tsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { isFavoritePending } from '../../store/favorite-process/selectors.ts';
import LoadingScreen from '../../components/loading-screen/loading-screen.tsx';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favoriteOffers: Offer[] = offers.filter((offer) => offer.isFavorite);
  const isLoading = useAppSelector(isFavoritePending);
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={cn(
      'page',
      { 'page--favorites-empty': favoriteOffers.length === 0 }
    )}
    >
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className={cn(
        'page__main',
        'page__main--favorites',
        { 'page__main--favorites-empty': favoriteOffers.length === 0 }
      )}
      >
        <div className="page__favorites-container container">
          { favoriteOffers.length > 0 ?
            <FavoritesList favoriteOffers={favoriteOffers}/> :
            <FavoritesEmpty /> }
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
