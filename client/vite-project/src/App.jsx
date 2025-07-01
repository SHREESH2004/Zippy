import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/shopping/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from '../components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import ShoppingLayout from '../components/shopping/layout';
import PageNotFound from './pages/notfound/no';
import Homepage from './pages/auth/Home';
import Listing from './pages/shopping/list';
import Checkout from './pages/shopping/checkout';
import Account from './pages/shopping/account';
import { useDispatch, useSelector } from 'react-redux';
import Checks from "../components/common/checkaith";
import { checkAuth } from './store/auth-slice';
import ProductPage from './pages/admin/Productpage';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  useEffect(()=>{

    dispatch(checkAuth())
  },[dispatch])


  return (
    <>
      {/* ✅ Toast container inside the component JSX */}
      <ToastContainer position="top-right" autoClose={3000} />

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
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing/>} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
