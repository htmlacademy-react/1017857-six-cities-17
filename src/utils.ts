import uniqid from 'uniqid';
import { Offer } from './types/offer.ts';

const convertRating = (rating: number) => rating * 100 / 5;

const getUniqId = () => uniqid('prefix-', '-suffix');

const sortOffersByPriceAscending = (offers: Offer[]): Offer[] => offers.sort((a, b) => a.price - b.price);
const sortOffersByPriceDescending = (offers: Offer[]): Offer[] => offers.sort((a, b) => b.price - a.price);
const sortOffersByRating = (offers: Offer[]): Offer[] => offers.sort((a, b) => b.rating - a.rating);

export { convertRating, getUniqId, sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating };
