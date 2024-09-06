import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../hooks/useSelector';
import { getUser } from '../../services/features/user/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);

  return <AppHeaderUI userName='' />;
};
