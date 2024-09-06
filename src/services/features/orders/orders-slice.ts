import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { getOrdersThunk } from './orders-thunk';
import { TOrder } from '@utils-types';
import { USER_ORDER_SLICE_NAME } from '../../../utils/constants';

interface IOrdersSliceState {
  orders: TOrder[];
  isLoading: boolean;
  errors: SerializedError | null;
}

const initialState: IOrdersSliceState = {
  orders: [],
  isLoading: false,
  errors: null
};

export const ordersSlice = createSlice({
  name: USER_ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.errors = null;
      });
  },

  selectors: {
    getOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.isLoading,
    getOrdersErrors: (state) => state.errors
  }
});

export const ordersActions = { ...ordersSlice.actions, getOrdersThunk };

export const { getOrders, getOrdersLoading, getOrdersErrors } =
  ordersSlice.selectors;
