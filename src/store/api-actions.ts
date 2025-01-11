import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer.ts';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const.ts';
import { loadOffers, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus, setUserData } from './action.ts';
import { User, UserData } from '../types/user-data.ts';
import { clearToken, setToken } from '../services/token.ts';
import { AuthData } from '../types/auth-data.ts';


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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<void>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
