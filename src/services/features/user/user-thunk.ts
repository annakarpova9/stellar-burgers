import {
  getUserApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { useAction } from '../../../hooks/useAction';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../../utils/constants';
import { userActions } from './user-slice';

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
  logoutUserApi
);

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUser`,
  async () => getUserThunk()
);
