import { combineReducers } from 'redux';
import { constructorSlice } from './features/constructor/constructor-slice';
import { feedSlice } from './features/feed/feed-slice';
import { ingredientsSlice } from './features/ingredients/ingredients-slice';
import { ordersSlice } from './features/orders/orders-slice';
import { userSlice } from './features/user/user-slice';
import { orderSlice } from './features/order/order-slice';

export const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userSlice.name]: userSlice.reducer
});
