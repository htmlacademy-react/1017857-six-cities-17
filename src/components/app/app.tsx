import { JSX } from 'react';
import MainPage from '../../pages/main-page/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '../../pages/favorites-page/favorites-page';

type AppProps = {
  placeCardCount: number;
}

function App({ placeCardCount }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main } element={ <MainPage placeCardCount={ placeCardCount } />} />
          <Route path={ AppRoute.Login } element={ <LoginPage /> } />
          <Route path={ AppRoute.Offer } element={ <OfferPage /> } />
          <Route path={ AppRoute.Favorites } element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path={ '*' } element={ <NotFoundPage /> } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
