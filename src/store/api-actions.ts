import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Offer, OfferExtended } from '../types/offer.ts';
import { APIRoute, AppRoute } from '../const.ts';
import { redirectToRoute } from './action.ts';
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
  }
);

export const fetchNearbyAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'offer/fetchNearby',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchReviewAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'offer/fetchReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'offer/postReview',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
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
  async ({ email: email, password: password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    if (data) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
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


