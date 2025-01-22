import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance, AxiosError } from 'axios';
import { Offer, OfferExtended } from '../types/offer.ts';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const.ts';
import {
  loadOffers, pushReview,
  redirectToRoute,
  requireAuthorization, setIsErrorOffer, setNearby, setOfferById,
  setOffersDataLoadingStatus, setReviews,
  setUserData
} from './action.ts';
import { User, UserData } from '../types/user-data.ts';
import { clearToken, setToken } from '../services/token.ts';
import { AuthData } from '../types/auth-data.ts';
import { Review, ReviewData } from '../types/review.ts';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data: { ...offerData } } = await api.get<OfferExtended>(`${APIRoute.Offers}/${id}`);
      dispatch(setIsErrorOffer(false));
      dispatch(setOfferById(offerData));
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        dispatch(setIsErrorOffer(true));
      }
    }
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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { token, ...userData } } = await api.get<UserData>(APIRoute.Login);
      const user: User = userData;
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      setToken(token);
      dispatch(setUserData(user));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email: email, password: password }, { dispatch, extra: api }) => {
    const { data: { token, ...userData } } = await api.post<UserData>(APIRoute.Login, { email, password });
    const user: User = userData;
    setToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(user));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    clearToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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
