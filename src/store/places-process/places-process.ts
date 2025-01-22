import { cities, DEFAULT_CITY, NameSpaces, Status } from '../../const.ts';
import { PlaceProcess } from '../../types/state.ts';
import { getDefaultCity } from '../../utils.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-actions.ts';

const initialState: PlaceProcess = {
  city: getDefaultCity(DEFAULT_CITY, cities),
  places: [],
  status: Status.idle,
};

export const placesProcess = createSlice({
  name: NameSpaces.Place,
  initialState,
  reducers: {
    selectLocation: (state, action: {payload: { locationName: string }}) => {
      const { locationName } = action.payload;
      const foundCity = cities.find((city) => city.name === locationName);
      if (foundCity) {
        state.city = { ...foundCity };
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = Status.isPending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.status = Status.isSuccess;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.places = [];
        state.status = Status.isError;
      });
  }
});

export const { selectLocation } = placesProcess.actions;
