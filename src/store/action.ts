import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer.ts';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import { User } from '../types/user-data.ts';

export const selectLocation = createAction<{locationName: string}>('selectLocation');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setUserData = createAction<User>('setUserData');
