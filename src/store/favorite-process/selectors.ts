import { NameSpaces, Status } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer.ts';

export const selectFavoriteOffers = (state: State): Offer[] => state[NameSpaces.Favorite].favoriteOffers;
export const selectIsOfferFavorite = (state: State, offerId: string): boolean => state[NameSpaces.Favorite].favoriteOffers.findIndex((offer) => offer.id === offerId) !== -1;
export const isFavoritePending = (state: State): boolean => state[NameSpaces.Favorite].status === Status.Pending;
