import { useDispatch as dispatchHook } from 'react-redux';
import store from '../services/store';

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
