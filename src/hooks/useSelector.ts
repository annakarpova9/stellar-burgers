import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { rootReducer } from '../services/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
