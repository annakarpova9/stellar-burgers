import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAction } from '../../hooks/useAction';
import { userActions } from '../../services/features/user/user-slice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logoutUserThunk, userLogout } = useAction(userActions);

  const handleLogout = () => {
    logoutUserThunk()
      .then(() => {
        userLogout();
      })
      .then(() => navigate('/login'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
