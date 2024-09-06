import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useAction } from '../../hooks/useAction';
import { ingredientsActions } from '../../services/features/ingredients/ingredients-slice';
import { userActions } from '../../services/features/user/user-slice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const { getIngredientsThunk } = useAction(ingredientsActions);
  const { checkUserAuth, authChecked } = useAction(userActions);

  useEffect(() => {
    getIngredientsThunk();
  }, []);

  useEffect(() => {
    checkUserAuth()
      .unwrap()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => authChecked());
  }, [authChecked]);

  const modalClose = () => {
    history.back();
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />

          <Route path='/feed'>
            <Route index element={<Feed />} />
            <Route path=':number' element={<OrderInfo />} />)
          </Route>

          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders'>
              <Route index element={<ProfileOrders />} />
              <Route
                path=':number'
                element={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route path='/ingredients/:id' element={<IngredientDetails />} />

          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={modalClose} title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={modalClose} title='Детали ингредиента '>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal onClose={modalClose} title='Детали заказа '>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
