import { rootReducer } from './rootReducer';
import store from './store';

describe('Root Reducer', () => {
  it('should initialize root reducer correctly', () => {
    const initialState = rootReducer(undefined, { type: '' });

    expect(initialState).toEqual(store.getState());
  });
});
