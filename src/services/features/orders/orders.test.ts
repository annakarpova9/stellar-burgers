import { getOrdersThunk } from './orders-thunk';
import {
  ordersSlice,
  initialState as initialOrdersState
} from './orders-slice';
import { mockOrders } from '../../../utils/mocks';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('Orders Slice', () => {
  it('should handle pending state correctly', () => {
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.pending.type
    });
    expect(actualState).toEqual({
      ...initialOrdersState,
      isLoading: true
    });
  });

  it('should handle fulfilled state correctly', () => {
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.fulfilled.type,
      payload: mockOrders.orders
    });
    expect(actualState).toEqual({
      ...initialOrdersState,
      orders: mockOrders.orders
    });
  });

  it('should handle rejected state correctly', () => {
    const mockError = new Error('Failed to fetch orders');
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.rejected.type,
      error: mockError
    });
    expect(actualState).toEqual({
      ...initialOrdersState,
      errors: mockError
    });
  });
});
