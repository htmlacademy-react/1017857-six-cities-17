import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import {checkAuthAction, fetchFavoriteOffersAction, fetchOfferAction} from './store/api-actions.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction())
  .unwrap()
  .then(() => {
    store.dispatch(fetchFavoriteOffersAction());
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
