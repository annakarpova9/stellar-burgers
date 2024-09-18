import {
  userSlice,
  userActions,
  initialState as initialUserState
} from './user-slice';
import { mockUser } from '../../../utils/mocks';
import {
  checkUserAuth,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './user-thunk';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutUserApi: jest.fn()
}));

describe('User Slice', () => {
  describe('Action: authChecked', () => {
    it('should change state authChecked', () => {
      const state = userSlice.reducer(
        initialUserState,
        userActions.authChecked()
      );

      expect(state).toEqual({
        ...initialUserState,
        isAuthChecked: true
      });
    });
  });

  describe('Action: userLogout', () => {
    it('should change state when logout ', () => {
      const filledState = {
        ...initialUserState,
        user: mockUser.user
      };

      const state = userSlice.reducer(filledState, userActions.userLogout());

      expect(state).toEqual({
        ...filledState,
        user: null,
        isAuthChecked: true
      });
    });
  });

  describe('registerUserThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.fulfilled.type,
        payload: mockUser.user
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user,
        isAuthenticated: true
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch register user');
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError
      });
    });
  });

  describe('loginUserThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.fulfilled.type,
        payload: mockUser
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser,
        isAuthenticated: true
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch login user');
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError
      });
    });
  });

  describe('checkUserAuth', () => {
    it('should handle pending state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.pending.type
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user,
        isAuthenticated: true,
        isAuthChecked: true
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch check user');
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialUserState,
        isAuthChecked: true,
        error: mockError
      });
    });
  });

  describe('updateUserThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.fulfilled.type,
        payload: mockUser
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user
      });
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch update user');
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError
      });
    });
  });
  describe('logoutUserThunk', () => {
    it('should handle pending state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.pending.type
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true
      });
    });

    it('should handle fulfilled state correctly', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.fulfilled.type
      });

      expect(actualState).toEqual(initialUserState);
    });

    it('should handle rejected state correctly', () => {
      const mockError = new Error('Failed to fetch logout user');
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.rejected.type,
        error: mockError
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError
      });
    });
  });
});
