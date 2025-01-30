import { NameSpace, Status } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Offer, OfferExtended } from '../../types/offer.ts';

export const checkErrorStatus = (state: State): boolean => state[NameSpace.Offer].status === Status.Error;
export const getOfferData = (state: State): OfferExtended | null => state[NameSpace.Offer].offerData;
export const getNearbyData = (state: State): Offer[] => state[NameSpace.Offer].nearbyData;
