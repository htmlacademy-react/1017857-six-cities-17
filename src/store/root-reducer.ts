import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { userProcess } from './user-process/user-process.ts';
import { placesProcess } from './places-process/places-process.ts';
import { offerProcess } from './offer-process/offer-process.ts';
import { favoriteProcess } from './favorite-process/favorite-process.ts';
import { reviewProcess } from './review-process/review-process.tsx';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Place]: placesProcess.reducer,
  [NameSpace.Favorite]: favoriteProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
