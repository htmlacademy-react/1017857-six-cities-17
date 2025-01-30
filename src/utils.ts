import { City, Offer } from './types/offer.ts';
import { Review } from './types/review.ts';

const convertRating = (rating: number) => Math.round(rating) * 100 / 5;

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

const getLatestReviews = (reviews: Review[], count: number): Review[] => [...reviews]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, count);

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export {
  convertRating,
  sortOffersByPriceAscending,
  sortOffersByPriceDescending,
  sortOffersByRating,
  getDefaultCity,
  getLatestReviews,
  capitalizeFirstLetter,
};
