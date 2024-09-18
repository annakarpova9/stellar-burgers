import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getFeedThunk } from './feed-thunk';
import { TOrder, TOrdersData } from '@utils-types';
import { FEED_SLICE_NAME } from '../../../utils/constants';

interface IFeedsSliceState {
  feed: TOrdersData | null;
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
}

export const initialState: IFeedsSliceState = {
  feed: null,
  orders: [],
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.error = null;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getFeetOrders: (state) => state.orders,
    getFeedsIsLoading: (state) => state.isLoading,
    getFeedsError: (state) => state.error
  }
});

export const feedActions = { ...feedSlice.actions, getFeedThunk };

export const { getFeed, getFeetOrders, getFeedsIsLoading, getFeedsError } =
  feedSlice.selectors;
