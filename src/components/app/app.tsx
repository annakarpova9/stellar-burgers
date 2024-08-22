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
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />

      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal onClose={() => {}} title='Детали заказа'>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>

      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />

      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />

      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />

      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
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
                <Modal onClose={() => {}} title='Детали заказа '>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route
        path='/ingredients/:id'
        element={
          <Modal onClose={() => {}} title='Детали ингредиента '>
            <IngredientDetails />
          </Modal>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
