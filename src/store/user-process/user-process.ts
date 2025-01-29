import { AuthorizationStatus, NameSpaces } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { clearToken, setToken } from '../../services/token.ts';
import { toast } from 'react-toastify';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userProcess = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        const { token, ...userData } = action.payload;
        setToken(token);
        state.userData = userData;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        clearToken();
        state.userData = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        const { token, ...userData } = action.payload;
        setToken(token);
        state.userData = userData;
        // toast.success('Login successful');
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error(`Login failed: ${action.error.message}`);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        clearToken();
      });
  }
});
