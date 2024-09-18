import {
  ingredientsSlice,
  initialState as initialIngredientsState
} from './ingredients-slice';
import { mockIngredients } from '../../../utils/mocks';
import { getIngredientsThunk } from './ingredients-thunk';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('Ingredients Slice', () => {
  it('should handle pending state correctly', () => {
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.pending.type
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      isLoading: true
    });
  });

  it('should handle fulfilled state correctly', () => {
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      ingredients: mockIngredients
    });
  });

  it('should handle rejected state correctly', () => {
    const mockError = new Error('Failed to fetch ingredients');
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.rejected.type,
      error: mockError
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      error: mockError
    });
  });
});
