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

type AppProps = {
  placeCardCount: number;
  authStatus: AuthorizationStatus;
}

function App({ placeCardCount, authStatus }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ AppRoute.Main } element={ <MainPage placeCardCount={ placeCardCount } />} />
          <Route path={ AppRoute.Login } element={ <LoginPage /> } />
          <Route path={ AppRoute.Offer } element={ <OfferPage /> } />
          <Route path={ AppRoute.Favorites } element={
            <PrivateRoute authorizationStatus={ authStatus }>
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
