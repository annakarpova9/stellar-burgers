import { RootState } from '../../hooks/useSelector';
import {
  FEED_SLICE_NAME,
  ORDER_SLICE_NAME,
  USER_ORDER_SLICE_NAME
} from '../../utils/constants';

export const orderInfoDataSelector = (number: string) => (state: RootState) => {
  if (state[USER_ORDER_SLICE_NAME].orders.length) {
    const data = state[USER_ORDER_SLICE_NAME].orders.find(
      (item) => item.number === +number
    );
    if (data) return data;
  }

  if (state[FEED_SLICE_NAME].orders.length) {
    const data = state[FEED_SLICE_NAME].orders.find(
      (item) => item.number === +number
    );
    if (data) return data;
  }

  if (state[ORDER_SLICE_NAME].orderByNumber?.number === +number) {
    return state[ORDER_SLICE_NAME].orderByNumber;
  }

  return null;
};
