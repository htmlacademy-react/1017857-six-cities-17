import {OfferProcess} from "../../types/state.ts";
import {NameSpaces, Status} from "../../const.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchOfferByIdAction} from "../api-actions.ts";

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
      .addCase(fetchOfferByIdAction.rejected, (state, action) => {
        console.log(action.error);
        state.status = Status.isError;
      });
  }
});
