import { JSX } from 'react';
import MainPage from '../pages/main-page/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import LoginPage from '../pages/login-page/login-page.tsx';
import OfferPage from '../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../components/private-route/private-route.tsx';
import FavoritesPage from '../pages/favorites-page/favorites-page.tsx';
import { Offer } from '../types/offer.ts';
import LoadingScreen from '../components/loading-screen/loading-screen.tsx';
import { useAppSelector } from '../hooks';
import HistoryRouter from '../components/history-route/history-route.tsx';
import browserHistory from '../browser-history.ts';

type AppProps = {
  placeCardCount: number;
}

function App({ placeCardCount }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers: Offer[] = useAppSelector((state) => state.offers);
  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={ AppRoute.Main }
            element={
              <MainPage
                placeCardCount={ placeCardCount }
                offers={offers}
              />
            }
          />
          <Route
            path={ AppRoute.Login }
            element={ <LoginPage /> }
          />
          <Route
            path={ AppRoute.Offer }
            element={ <OfferPage /> }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute authorizationStatus={ authorizationStatus }>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={ '*' }
            element={ <NotFoundPage /> }
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
