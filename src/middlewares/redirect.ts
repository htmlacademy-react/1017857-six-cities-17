import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import browserHistory from '../browser-history.ts';
import { rootReducer } from '../store/root-reducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'user/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
