import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';

// Common Auth Checker
import Checks from "../components/common/checkaith";

// Admin Pages
import AdminLayout from '../components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import ProductPage from './pages/admin/Productpage';

// Shopping Pages
import ShoppingLayout from '../components/shopping/layout';
import Home from './pages/shopping/home';
import Listing from './pages/shopping/list';
import Checkout from './pages/shopping/checkout';
import Account from './pages/shopping/account';

// Auth Pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Homepage from './pages/auth/Home';

// Fallback Page
import PageNotFound from './pages/notfound/no';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {/* Routes */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
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

        {/* Shopping */}
        <Route
          path="/shopping"
          element={
            <Checks isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Checks>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
