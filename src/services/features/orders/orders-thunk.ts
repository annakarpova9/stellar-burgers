import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { USER_SLICE_NAME } from '../../../utils/constants';

export const getOrdersThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/orders`,
  async () => await getOrdersApi()
);
