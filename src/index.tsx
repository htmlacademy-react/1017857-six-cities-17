import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Setting } from './const';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOfferAction } from './store/api-actions.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer />
      <App
        placeCardCount={ Setting.PlaceCardCount }
      />
    </Provider>
  </React.StrictMode>
);
