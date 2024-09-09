import {
  getUserApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../../utils/constants';

export const registerUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (data: TRegisterData) =>
    registerUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

export const loginUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  getUserApi
);

export const updateUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  () => {
    logoutUserApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });
  }
);

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUser`,
  async (_, { dispatch }) => {
    const response = await dispatch(getUserThunk());

    if (getUserThunk.fulfilled.match(response)) {
      return response.payload;
    } else {
      throw new Error('Ошибка аутентификации пользователя');
    }
  }
);
