import { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import {
  getUser,
  getUserIsAuthChecked
} from '../../services/features/user/user-slice';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export function ProtectedRoute({ children, onlyUnAuth }: TProtectedRouteProps) {
  const isAuthChecked = useSelector(getUserIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const background = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ background }} />;
  }

  return children;
}
