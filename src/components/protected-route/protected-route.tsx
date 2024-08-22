import { ReactElement } from 'react';

type TProtectedRouteProps = {
  children: ReactElement;
};

export function ProtectedRoute({ children }: TProtectedRouteProps) {
  return children;
}

export function ProtectedRouteAuth({ children }: TProtectedRouteProps) {
  return children;
}
