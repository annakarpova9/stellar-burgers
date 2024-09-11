import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAction } from '../../hooks/useAction';
import { useSelector } from '../../hooks/useSelector';
import {
  getUserError,
  userActions
} from '../../services/features/user/user-slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getUserError);

  const { loginUserThunk } = useAction(userActions);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUserThunk({ email, password });
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
