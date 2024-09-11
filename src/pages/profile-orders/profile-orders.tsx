import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  getOrders,
  getOrdersLoading,
  ordersActions
} from '../../services/features/orders/orders-slice';
import { Preloader } from '@ui';
import { useAction } from '../../hooks/useAction';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const ordersLoading = useSelector(getOrdersLoading);
  const { getOrdersThunk } = useAction(ordersActions);

  if (orders.length === 0) {
    getOrdersThunk();
  }

  if (ordersLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
