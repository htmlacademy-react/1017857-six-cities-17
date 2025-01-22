import { NameSpaces, Status } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Offer, OfferExtended } from '../../types/offer.ts';
import { Review } from '../../types/review.ts';

export const checkErrorStatus = (state: State): boolean => state[NameSpaces.Offer].status === Status.isError;
export const getOfferData = (state: State): OfferExtended | null => state[NameSpaces.Offer].offerData;
export const getNearbyData = (state: State): Offer[] => state[NameSpaces.Offer].nearbyData;
export const getReviewData = (state: State): Review[] => state[NameSpaces.Offer].reviewData;
