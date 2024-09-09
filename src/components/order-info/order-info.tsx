import { FC, useEffect, useMemo } from 'react';

import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { OrderInfoUI, Preloader } from '@ui';
import { getIngredients } from '../../services/features/ingredients/ingredients-slice';
import { useSelector } from '../../hooks/useSelector';
import { useAction } from '../../hooks/useAction';
import {
  getOrderByNumber,
  orderActions
} from '../../services/features/order/order-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const { getOrderByNumberThunk } = useAction(orderActions);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  const orderData = useSelector(getOrderByNumber);
<<<<<<< HEAD

  // useEffect(() => {
  //   if (number) {
  //     getOrderByNumberThunk(Number(number));
  //   }
  // }, [number]);
=======
>>>>>>> e433b06da52dd04d677a4a2cefb3a053f3ac4bb8

  useEffect(() => {
    if (!orderData) {
      getOrderByNumberThunk(Number(number));
    }
  }, [orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients, number]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
