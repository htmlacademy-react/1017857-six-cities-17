import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Favorite, Offer, OfferExtended } from '../types/offer.ts';
import { APIRoute, NameSpace } from '../const.ts';
import { UserData } from '../types/user-data.ts';
import { AuthData } from '../types/auth-data.ts';
import { Review, ReviewData } from '../types/review.ts';

export const fetchOfferAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Place}/fetchOffers`,
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
  `${NameSpace.Offer}/fetchOfferById`,
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
  `${NameSpace.Offer}/fetchNearby`,
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
  `${NameSpace.Offer}/fetchReviews`,
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
  `${NameSpace.Offer}/postReview`,
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorite}/fetchFavoriteOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteOffersAction());
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({ email: email, password: password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    dispatch(fetchFavoriteOffersAction());
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  stata: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);

export const uploadFavoriteStatusAction = createAsyncThunk<Offer, Favorite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorite}/uploadStatus`,
  async ({ offerId, isFavorite }, { getState, extra: api }) => {
    const offerStatus = isFavorite ? 0 : 1;
    const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${offerStatus}`);

    const state = getState();
    const { places } = state[NameSpace.Place];
    const currentPlace: Offer | undefined = places.find((place: Offer) => place.id === data.id);

    if (!currentPlace) {
      throw new Error(`Offer not found: ${data.id}`);
    }

    return { ...currentPlace, isFavorite: data.isFavorite };
  }
);
