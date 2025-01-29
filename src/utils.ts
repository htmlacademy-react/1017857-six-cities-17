import { City, Offer } from './types/offer.ts';
import {Setting} from "./const.ts";
import {Review} from "./types/review.ts";

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

const getNearOffers = (offers: Offer[], allOffers: Offer[], id: string| undefined)=> {
  if (!id) {
    return null;
  }
  const neighbourhoodCount = Setting.NeighbourhoodCount;
  const currentOffer = allOffers.find((offer) => offer.id === id);
  const slicedOffers = offers.slice(0, neighbourhoodCount);
  const nearbyOffers = [...slicedOffers, currentOffer];

  return {
    slicedOffers,
    nearbyOffers
  };
};

const getLatestReviews = (reviews: Review[], count: number): Review[] => [...reviews]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, count);

export {
  convertRating,
  sortOffersByPriceAscending,
  sortOffersByPriceDescending,
  sortOffersByRating,
  getDefaultCity,
  getNearOffers,
  getLatestReviews
};
