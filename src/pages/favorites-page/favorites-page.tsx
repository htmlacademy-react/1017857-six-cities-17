import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header.tsx';
import FavoritesList from '../../components/favorites-list/favorites-list.tsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { isFavoritePending, selectFavoriteOffers } from '../../store/favorite-process/selectors.ts';
import LoadingScreen from '../../components/loading-screen/loading-screen.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';


function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
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
            <FavoritesList favoriteOffers={favoriteOffers} /> :
            <FavoritesEmpty /> }
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.Main} className="footer__logo-link">
          <img className="footer__logo" src={'img/logo.svg'} alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
