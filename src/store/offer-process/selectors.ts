import { NameSpaces, Status } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Offer, OfferExtended } from '../../types/offer.ts';

export const checkErrorStatus = (state: State): boolean => state[NameSpaces.Offer].status === Status.Error;
export const getOfferData = (state: State): OfferExtended | null => state[NameSpaces.Offer].offerData;
export const getNearbyData = (state: State): Offer[] => state[NameSpaces.Offer].nearbyData;
export const getStatus = (state: State): Status => state[NameSpaces.Offer].status;
