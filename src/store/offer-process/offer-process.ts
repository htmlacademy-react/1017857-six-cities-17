import { OfferProcess } from '../../types/state.ts';
import { NameSpace, Status } from '../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyAction, fetchOfferByIdAction } from '../api-actions.ts';

const initialState: OfferProcess = {
  offerData: null,
  nearbyData: [],
  status: Status.Idle
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offerData = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearbyData = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
