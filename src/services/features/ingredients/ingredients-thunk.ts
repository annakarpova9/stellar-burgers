import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { INGREDIENT_SLICE_NAME } from '../../../utils/constants';

export const getIngredientsThunk = createAsyncThunk(
  `${INGREDIENT_SLICE_NAME}/getIngredients`,
  async () => await getIngredientsApi()
);
