import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useSelector } from '../../hooks/useSelector';
import { getIngredients } from '../../services/features/ingredients/ingredients-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector(getIngredients).find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
