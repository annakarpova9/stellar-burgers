import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAction } from '../../hooks/useAction';
import { constructorActions } from '../../services/features/constructor/constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, ...rest }) => {
    const { reorderConstructor, removeFromConstructor } =
      useAction(constructorActions);
    const handleMoveDown = () => {
      reorderConstructor({
        from: index,
        to: index + 1
      });
    };

    const handleMoveUp = () => {
      reorderConstructor({
        from: index,
        to: index - 1
      });
    };

    const handleClose = () => {
      removeFromConstructor(index);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        {...rest}
      />
    );
  }
);
