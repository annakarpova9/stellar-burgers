import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector } from '../../hooks/useSelector';
import {
  getUserError,
  getUserIsAuthenticated,
  userActions
} from '../../services/features/user/user-slice';
import { useAction } from '../../hooks/useAction';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(getUserError);
  const isAuthenticated = useSelector(getUserIsAuthenticated);

  const { registerUserThunk, loginUserThunk } = useAction(userActions);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUserThunk({ name: userName, email, password });
    if (isAuthenticated) {
      loginUserThunk({ email, password });
    } else {
      console.log(error);
    }
  };

  return (
    <RegisterUI
      errorText={error?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
