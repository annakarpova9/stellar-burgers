import { feedSlice, initialState as initialFeedState } from './feed-slice';
import { getFeedThunk } from './feed-thunk';
import { mockFeed } from '../../../utils/mocks';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('Feed Slice', () => {
  it('should handle pending state correctly', () => {
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.pending.type
    });
    expect(actualState).toEqual({
      ...initialFeedState,
      isLoading: true
    });
  });

  it('should handle fulfilled state correctly', () => {
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.fulfilled.type,
      payload: mockFeed
    });
    expect(actualState).toEqual({
      ...initialFeedState,
      feed: mockFeed,
      orders: mockFeed.orders
    });
  });

  it('should handle rejected state correctly', () => {
    const mockError = new Error('Failed to fetch feed');
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.rejected.type,
      error: mockError
    });
    expect(actualState).toEqual({
      ...initialFeedState,
      error: mockError
    });
  });
});
