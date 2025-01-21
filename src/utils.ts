import uniqid from 'uniqid';
import {City, Offer} from './types/offer.ts';

const convertRating = (rating: number) => rating * 100 / 5;

const getUniqId = () => uniqid('prefix-', '-suffix');

const sortOffersByPriceAscending = (offers: Offer[]): Offer[] => offers.sort((a, b) => a.price - b.price);
const sortOffersByPriceDescending = (offers: Offer[]): Offer[] => offers.sort((a, b) => b.price - a.price);
const sortOffersByRating = (offers: Offer[]): Offer[] => offers.sort((a, b) => b.rating - a.rating);

const getDefaultCity = (cityName: string, places: City[]): City => {
  const city = places.find((place: City) => place.name === cityName);
  if (!city) {
    throw new Error(`City with name ${cityName} not found`);
  }
  return city;
};


export { convertRating, getUniqId, sortOffersByPriceAscending, sortOffersByPriceDescending, sortOffersByRating, getDefaultCity };
