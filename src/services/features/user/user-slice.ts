import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './user-thunk';
import { USER_SLICE_NAME } from '../../../utils/constants';

interface IUserSliceState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: SerializedError | null;
  request: boolean;
}

const initialState: IUserSliceState = {
  user: null,
  isAuthChecked: false, // // была ли соверешена проверка наличия пользователя по токену
  isAuthenticated: false, // авторизация пройдена
  error: null,
  request: false
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.error = null;
      state.request = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error;
        state.request = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.request = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error;
        state.request = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = null;
        state.request = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error;
        state.request = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.request = false;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error;
        state.request = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.request = false;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.error;
        state.request = false;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = null;
        state.request = false;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.error = action.error;
        state.request = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getUserIsAuthChecked: (state) => state.isAuthChecked,
    getUserIsAuthenticated: (state) => state.isAuthenticated,
    getUserError: (state) => state.error,
    getUserRequest: (state) => state.request
  }
});

export const userActions = {
  ...userSlice.actions,
  registerUserThunk,
  loginUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutUserThunk,
  checkUserAuth
};
export const {
  getUser,
  getUserIsAuthChecked,
  getUserIsAuthenticated,
  getUserError,
  getUserRequest
} = userSlice.selectors;
