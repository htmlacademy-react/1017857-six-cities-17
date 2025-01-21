import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Offer, OfferExtended } from '../types/offer.ts';
import { APIRoute } from '../const.ts';
import {
  pushReview,
  setNearby,
  setReviews,
} from './action.ts';
import { UserData } from '../types/user-data.ts';
import { AuthData } from '../types/auth-data.ts';
import { Review, ReviewData } from '../types/review.ts';

export const fetchOfferAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'places/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
    // dispatch(setOffersDataLoadingStatus(true));
    // const { data } = await api.get<Offer[]>(APIRoute.Offers);
    // dispatch(setOffersDataLoadingStatus(false));
    // dispatch(loadOffers(data));
  }
);

export const fetchOfferByIdAction = createAsyncThunk<OfferExtended, string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOfferById',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferExtended>(`${APIRoute.Offers}/${id}`);
    return data;
    // try {
    //
    //   dispatch(setIsErrorOffer(false));
    //   dispatch(setOfferById(offerData));
    // } catch (error) {
    //   const axiosError = error as AxiosError;
    //
    //   if (axiosError.response?.status === 404) {
    //     dispatch(setIsErrorOffer(true));
    //   }
    // }
  }
);

export const fetchNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'fetchNearby',
  async (id, { dispatch, extra: api }) => {
    const { data: [...nearbyData] } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setNearby(nearbyData));
  }
);

export const fetchReviewAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (id, { dispatch, extra: api }) => {
    const { data: [...reviewData] } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(reviewData));
  }
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data: { ...reviewData } } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    const review: Review = reviewData;
    dispatch(pushReview(review));
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email: email, password: password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);


