import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { ORDER_SLICE_NAME } from '../../../utils/constants';

export const postOrderThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/postOrder`,
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumberThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number) => await getOrderByNumberApi(number)
);
