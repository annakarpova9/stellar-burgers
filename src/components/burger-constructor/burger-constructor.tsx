import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../hooks/useSelector';
import {
  getOrderModalData,
  getOrderRequest,
  orderActions
} from '../../services/features/order/order-slice';
import { useAction } from '../../hooks/useAction';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/features/user/user-slice';

import {
  constructorActions,
  getConstructorBun,
  getConstructorIngredients
} from '../../services/features/constructor/constructor-slice';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { resetOrderModal, postOrderThunk } = useAction(orderActions);
  const { resetConstructor } = useAction(constructorActions);

  const user = useSelector(getUser);
  const ingredients = useSelector(getConstructorIngredients);
  const bun = useSelector(getConstructorBun);

  const orderData = ingredients
    .map((i) => i._id)
    .concat([bun?._id || ''], [bun?._id || ''])
    .filter((i) => i !== '');

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    postOrderThunk(orderData);
    resetConstructor();
  };
  const closeOrderModal = () => {
    resetOrderModal();
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
