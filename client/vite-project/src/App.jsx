import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import Account from './pages/shopping/Account';
// Auth Guard
import Checks from "../components/common/checkaith";

// Admin Layout & Pages
import AdminLayout from '../components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import ProductPage from './pages/admin/Productpage';

// Shopping Layout & Pages
import ShoppingLayout from '../components/shopping/layout';
import Shophome from './pages/shopping/Shophome';
import Listing from './pages/shopping/list';
import Checkout from './pages/shopping/checkout';

// Auth Pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Homepage from './pages/auth/Home';

// Fallback
import PageNotFound from './pages/notfound/no';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Checks isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </Checks>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<ProductPage />} />
        </Route>

        {/* Shopping Routes */}
        <Route
          path="/shopping"
          element={
            <Checks isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Checks>
          }
        >
          <Route path="home" element={<Shophome />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account/>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Global Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
