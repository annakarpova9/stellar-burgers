import { TConstructorIngredient } from '@utils-types';
import { constructorActions, constructorSlice } from './constructor-slice';
import { describe } from '@jest/globals';
import {
  bunFirstMock,
  bunSecondMock,
  mainFirstMock,
  mainSecondMock,
  sauceFirstMock,
  sauceSecondMock
} from '../../../utils/mocks';

describe('Constructor Slice', () => {
  describe('Add Ingredients', () => {
    it('should add a bun to the constructor', () => {
      const initialState = { bun: null, ingredients: [] };

      let state = constructorSlice.reducer(
        initialState,
        constructorActions.addToConstructor(bunFirstMock)
      );

      expect(state.bun).toMatchObject({
        ...bunFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      state = constructorSlice.reducer(
        state,
        constructorActions.addToConstructor(bunSecondMock)
      );

      expect(state.bun).toMatchObject({
        ...bunSecondMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      expect(state.ingredients).toHaveLength(0);
    });

    it('should add an ingredient to the constructor', () => {
      const initialState = { bun: null, ingredients: [] };

      let state = constructorSlice.reducer(
        initialState,
        constructorActions.addToConstructor(mainFirstMock)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mainFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      state = constructorSlice.reducer(
        state,
        constructorActions.addToConstructor(sauceFirstMock)
      );

      expect(state.ingredients).toHaveLength(2);

      expect(state.ingredients[0]).toMatchObject({
        ...mainFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      expect(state.ingredients[1]).toMatchObject({
        ...sauceFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);
    });
  });
  describe('Remove Ingredient', () => {
    it('should remove an ingredient from the constructor', () => {
      const initialState = {
        bun: {
          ...bunSecondMock,
          id: '234'
        },
        ingredients: [
          {
            ...mainSecondMock,
            id: '567'
          },
          {
            ...sauceSecondMock,
            id: '678'
          }
        ]
      };
      let state = constructorSlice.reducer(
        initialState,
        constructorActions.removeFromConstructor(1)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe('Начинка 2');

      expect(state.bun?.name).toBe('Булка 2');
    });
  });
  describe('Reorder Ingredients', () => {
    it('should reorder ingredients in the constructor', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { ...mainFirstMock, id: '345' },
          { ...sauceFirstMock, id: '567' },
          { ...mainSecondMock, id: '456' }
        ]
      };

      const state = constructorSlice.reducer(
        initialState,
        constructorActions.reorderConstructor({ from: 0, to: 2 })
      );
      expect(state.ingredients[0].name).toBe('Соус 1');
      expect(state.ingredients[2].name).toBe('Начинка 1');
    });
  });
  describe('Reset Constructor', () => {
    it('should reset the constructor to initial state', () => {
      const initialState = {
        bun: null,
        ingredients: []
      };

      const filledState = {
        bun: {
          ...bunFirstMock,
          id: '123'
        },
        ingredients: [
          {
            ...mainSecondMock,
            id: '345'
          }
        ]
      };

      const state = constructorSlice.reducer(
        filledState,
        constructorActions.resetConstructor()
      );

      expect(state).toEqual(initialState);
    });
  });
});
