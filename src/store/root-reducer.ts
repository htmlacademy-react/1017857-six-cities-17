import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../const.ts';
import { userProcess } from './user-process/user-process.ts';
import { placesProcess } from './places-process/places-process.ts';
import { offerProcess } from './offer-process/offer-process.ts';
import { favoriteProcess } from './favorite-process/favorite-process.ts';
import { reviewProcess } from './review-process/review-process.tsx';

export const rootReducer = combineReducers({
  [NameSpaces.User]: userProcess.reducer,
  [NameSpaces.Offer]: offerProcess.reducer,
  [NameSpaces.Place]: placesProcess.reducer,
  [NameSpaces.Favorite]: favoriteProcess.reducer,
  [NameSpaces.Review]: reviewProcess.reducer,
});
