import { OfferProcess } from '../../types/state.ts';
import { NameSpaces, Status } from '../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyAction, fetchOfferByIdAction, fetchReviewAction, postReviewAction } from '../api-actions.ts';

const initialState: OfferProcess = {
  offerData: null,
  nearbyData: [],
  reviewData: [],
  status: Status.idle
};

export const offerProcess = createSlice({
  name: NameSpaces.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.status = Status.isPending;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offerData = action.payload;
        state.status = Status.isSuccess;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.status = Status.isError;
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.status = Status.isPending;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearbyData = action.payload;
        state.status = Status.isSuccess;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.status = Status.isError;
      })
      .addCase(fetchReviewAction.pending, (state) => {
        state.status = Status.isPending;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviewData = action.payload;
        state.status = Status.isSuccess;
      })
      .addCase(fetchReviewAction.rejected, (state) => {
        state.status = Status.isError;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewData = [...state.reviewData, action.payload];
        state.status = Status.isSuccess;
      });
  }
});
