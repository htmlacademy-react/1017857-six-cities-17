
import { createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpaces, Status } from '../../const';
import { fetchFavoriteOffersAction, uploadFavoriteStatusAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  uploadingFavoriteStatus: Status.idle
};

export const favoriteProcess = createSlice({
  name: NameSpaces.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })

      .addCase(uploadFavoriteStatusAction.pending, (state) => {
        state.uploadingFavoriteStatus = Status.isPending;
      })
      .addCase(uploadFavoriteStatusAction.fulfilled, (state, action) => {
        state.uploadingFavoriteStatus = Status.isSuccess;
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          const favoriteIndex = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
          state.favoriteOffers.splice(favoriteIndex, 1);
        }
        state.uploadingFavoriteStatus = Status.idle;
      })
      .addCase(uploadFavoriteStatusAction.rejected, (state) => {
        state.uploadingFavoriteStatus = Status.isError;
        state.uploadingFavoriteStatus = Status.idle;
      });
  },
});
