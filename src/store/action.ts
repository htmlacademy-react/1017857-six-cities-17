import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferExtended } from '../types/offer.ts';
import { AppRoute, AuthorizationStatus } from '../const.ts';
import { User } from '../types/user-data.ts';
import { Review } from '../types/review.ts';

export const selectLocation = createAction<{locationName: string}>('selectLocation');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setUserData = createAction<User>('setUserData');

export const setOfferById = createAction<OfferExtended | null>('setOfferById');

export const setNearby = createAction<Offer[]>('setNearby');

export const setReviews = createAction<Review[]>('setReviews');

export const pushReview = createAction<Review>('pushReview');

export const setIsErrorOffer = createAction<boolean>('setIsError');

