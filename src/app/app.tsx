import { JSX } from 'react';
import MainPage from '../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import LoginPage from '../pages/login-page/login-page.tsx';
import OfferPage from '../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../components/private-route/private-route.tsx';
import FavoritesPage from '../pages/favorites-page/favorites-page.tsx';
import { Offer, OfferExtended } from '../types/offer.ts';
import LoadingScreen from '../components/loading-screen/loading-screen.tsx';
import { useAppSelector } from '../hooks';

type AppProps = {
  placeCardCount: number;
  authStatus: AuthorizationStatus;
  offersExtended: OfferExtended[];
}

function App({ placeCardCount, authStatus, offersExtended }: AppProps): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers: Offer[] = useAppSelector((state) => state.offers);
  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
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
            element={ <OfferPage offersExtended={offersExtended} offers={offers} /> }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute authorizationStatus={ authStatus }>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={ '*' }
            element={ <NotFoundPage /> }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
