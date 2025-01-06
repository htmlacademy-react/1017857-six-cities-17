import { createReducer } from '@reduxjs/toolkit';
import { selectLocation } from './action.ts';
import { cities } from '../mocks/city.ts';


const initialState = {
  city: cities[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectLocation, (state, action) => {
      const { locationName } = action.payload;
      const foundCity = cities.find((city) => city.name === locationName);
      if (foundCity) {
        state.city = { ...foundCity };
      }
    });
});

export { reducer };
