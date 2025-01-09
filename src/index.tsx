import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { AuthorizationStatus, Setting } from './const';
import { offersExt } from './mocks/offers-ext.ts';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOfferAction } from './store/api-actions.ts';

store.dispatch(fetchOfferAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App
        placeCardCount={ Setting.PlaceCardCount }
        authStatus={ AuthorizationStatus.Auth }
        offersExtended={ offersExt }
      />
    </Provider>
  </React.StrictMode>
);
