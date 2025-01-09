import { createReducer } from '@reduxjs/toolkit';
import { selectLocation, loadOffers, setOffersDataLoadingStatus } from './action.ts';
import { cities, DEFAULT_CITY } from '../const.ts';
import { City, Offer } from '../types/offer.ts';

const getDefaultCity = (cityName: string, places: City[]): City => {
  const city = places.find((place: City) => place.name === cityName);
  if (!city) {
    throw new Error(`City with name ${cityName} not found`);
  }
  return city;
};

type InitialState = {
  city: City;
  offers: Offer[];
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  city: getDefaultCity(DEFAULT_CITY, cities),
  offers: [],
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectLocation, (state, action) => {
      const { locationName } = action.payload;
      const foundCity = cities.find((city) => city.name === locationName);
      if (foundCity) {
        state.city = { ...foundCity };
      }
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
