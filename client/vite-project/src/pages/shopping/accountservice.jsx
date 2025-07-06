// AccountService.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountUI from './AccountUI';

const AccountService = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!userId || !token) return;

    const fetchData = async () => {
      try {
        const [addrRes, cartRes] = await Promise.all([
          axios.get(`http://localhost:3000/address/${userId}`),
          axios.get(`http://localhost:3000/cart/?userId=${userId}`, { headers }),
        ]);

        setAddresses(addrRes.data);
        setCart(cartRes.data.cart);
      } catch (error) {
        console.error('Error loading account data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <AccountUI
      loading={loading}
      addresses={addresses}
      cart={cart}
    />
  );
};

export default AccountService;
