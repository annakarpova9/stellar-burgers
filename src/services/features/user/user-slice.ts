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

export const initialState: IUserSliceState = {
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
        state.request = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.request = false;
        state.error = action.error;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.request = false;
        state.error = action.error;
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = !!action.payload; // если пользователь есть, значит авторизация пройдена
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.request = false;
        state.isAuthChecked = true; // проверка выполнена, даже если неудачно
        state.isAuthenticated = false;
        state.error = action.error;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.request = false;
        state.error = action.error;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.request = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.request = false;
        state.error = action.error;
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
