import {
  orderSlice,
  initialState as initialOrderState,
  orderActions
} from './order-slice';
import { mockOrders, mockPostOrder } from '../../../utils/mocks';
import { getOrderByNumberThunk, postOrderThunk } from './order-thunk';
jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('Order Slice', () => {
  describe('Action: resetOrderModal', () => {
    it('should reset the order modal', () => {
      const filledState = {
        ...initialOrderState,
        orderModalData: mockOrders.orders[0]
      };

      const state = orderSlice.reducer(
        filledState,
        orderActions.resetOrderModal()
      );

      expect(state).toEqual({
        ...filledState,
        orderModalData: null
      });
    });
  });
  describe('postOrderThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        orderRequest: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.fulfilled.type,
        payload: mockPostOrder
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        orderModalData: mockPostOrder.order
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch post order');
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        error: mockError
      });
    });
  });
  describe('getOrderByNumberThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        orderByNumberRequest: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: mockOrders
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        orderByNumber: mockOrders.orders[0]
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch post order');
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialOrderState,
        error: mockError
      });
    });
  });
});
