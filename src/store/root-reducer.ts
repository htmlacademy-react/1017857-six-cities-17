import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../const.ts';
import { userProcess } from './user-process/user-process.ts';
import { placesProcess } from './places-process/places-process.ts';
import { offerProcess } from './offer-process/offer-process.ts';

export const rootReducer = combineReducers({
  [NameSpaces.User]: userProcess.reducer,
  [NameSpaces.Offer]: offerProcess.reducer,
  [NameSpaces.Place]: placesProcess.reducer,
});
