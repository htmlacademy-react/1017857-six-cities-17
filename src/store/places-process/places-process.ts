import { cities, DEFAULT_CITY, NameSpaces, Status } from '../../const.ts';
import { PlaceProcess } from '../../types/state.ts';
import { getDefaultCity } from '../../utils.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-actions.ts';
import { toast } from 'react-toastify';

const initialState: PlaceProcess = {
  city: getDefaultCity(DEFAULT_CITY, cities),
  places: [],
  status: Status.Idle,
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
    },
    setPlacesIdleStatus: (state) => {
      state.status = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.places = [];
        state.status = Status.Error;
        toast.error(action.error.message);
      });
  }
});

export const { selectLocation, setPlacesIdleStatus } = placesProcess.actions;
