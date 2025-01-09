import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer.ts';

export const selectLocation = createAction<{locationName: string}>('selectLocation');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
