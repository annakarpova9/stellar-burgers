import { FC } from 'react';

import { TOrder } from '@utils-types';
import { useSelector } from '../../hooks/useSelector';
import {
  getFeed,
  getFeetOrders
} from '../../services/features/feed/feed-slice';
import { FeedInfoUI } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getFeetOrders);
  const feed = useSelector(getFeed);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
