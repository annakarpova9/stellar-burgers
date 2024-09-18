import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { FEED_SLICE_NAME } from '../../../utils/constants';

export const getFeedThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeed`,
  getFeedsApi
);
