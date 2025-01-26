import { store } from '../store';
import { AuthorizationStatus, Status } from '../const.ts';
import { User } from './user-data.ts';
import { City, Offer, OfferExtended } from './offer.ts';
import { Review } from './review.ts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
}

export type PlaceProcess = {
  city: City;
  places: Offer[];
  status: Status;
}

export type OfferProcess = {
  offerData: OfferExtended | null;
  nearbyData: Offer[];
  status: Status;
}

export type FavoriteProcess = {
  favoriteOffers: Offer[];
  isFavoriteOffersLoading: boolean;
  status: Status;
}

export type ReviewProcess = {
  reviewData: Review[];
  status: Status;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
