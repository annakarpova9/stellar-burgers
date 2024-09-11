import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  feedActions,
  getFeetOrders
} from '../../services/features/feed/feed-slice';
import { useAction } from '../../hooks/useAction';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeetOrders);

  const { getFeedThunk } = useAction(feedActions);

  useEffect(() => {
    getFeedThunk();
  }, []);

  const handleGetFeeds = () => {
    location.assign('/feed');
    getFeedThunk();
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
