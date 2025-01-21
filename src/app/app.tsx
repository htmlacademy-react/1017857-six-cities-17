import { JSX } from 'react';
import MainPage from '../pages/main-page/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../const.ts';
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
import { getAuthCheckedStatus, getAuthorizationStatus } from '../store/user-process/selectors.ts';
import { getPlaces, isPlacesDataPending } from '../store/places-process/selectors.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isPlacesPending = useAppSelector(isPlacesDataPending);
  const offers: Offer[] = useAppSelector(getPlaces);
  // if (isPlacesPending) {
  //   return (
  //     <LoadingScreen />
  //   );
  // }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={ AppRoute.Main }
            element={
              <MainPage
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
