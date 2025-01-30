import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer.ts';

export const selectFavoriteOffers = (state: State): Offer[] => state[NameSpace.Favorite].favoriteOffers;
export const isFavoritePending = (state: State): boolean => state[NameSpace.Favorite].status === Status.Pending;
export const selectIsOfferFavorite = (state: State, offerId: string): boolean => !!state[NameSpace.Favorite].favoriteOffers.find((offer) => offer.id === offerId);
