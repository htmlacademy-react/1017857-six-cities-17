import { ReviewProcess } from '../../types/state.ts';
import { NameSpaces, Status } from '../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewAction, postReviewAction } from '../api-actions.ts';
import { toast } from 'react-toastify';

const initialState: ReviewProcess = {
  reviewData: [],
  status: Status.Idle
};

export const reviewProcess = createSlice({
  name: NameSpaces.Review,
  initialState,
  reducers: {
    setReviewIdleStatus: (state) => {
      state.status = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviewData = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchReviewAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewData = [...state.reviewData, action.payload];
        state.status = Status.Success;
        toast.success('Comment successfully added');
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export const { setReviewIdleStatus } = reviewProcess.actions;
