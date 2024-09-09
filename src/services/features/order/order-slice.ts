import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../../utils/constants';
import { getOrderByNumberThunk, postOrderThunk } from './order-thunk';
import { TOrder } from '@utils-types';
import { TNewOrderResponse } from '@api';

type TOrderState = {
  orderRequest: boolean;
  orderByNumberRequest: boolean;
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  error: SerializedError | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderByNumberRequest: false,
  orderModalData: null,
  orderByNumber: null,
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error;
      })
      .addCase(
        postOrderThunk.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderModalData = action.payload.order;
          state.orderRequest = false;
          state.error = null;
        }
      )
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderByNumberRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.orderByNumberRequest = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.orderByNumberRequest = false;
        state.error = null;
      });
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderByNumberRequest: (state) => state.orderByNumberRequest,
    getOrderByNumber: (state) => state.orderByNumber,
    getOrderModalData: (state) => state.orderModalData,
    getOrderError: (state) => state.error
  }
});

export const {
  getOrderRequest,
  getOrderByNumberRequest,
  getOrderByNumber,
  getOrderModalData,
  getOrderError
} = orderSlice.selectors;

export const orderActions = {
  ...orderSlice.actions,
  postOrderThunk,
  getOrderByNumberThunk
};
