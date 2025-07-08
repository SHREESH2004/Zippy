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

  // 🔁 Fetch all account-related data
  const fetchAccountData = async () => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const [addrRes, cartRes] =
        await Promise.all([
          axios.get(`${SERVER_URL}/address/${userId}`),
          axios.get(`${SERVER_URL}/cart/?userId=${userId}`, { headers }),
        ]);


      setAddresses(addrRes.data);
      setCart(cartRes.data.cart);
    } catch (error) {
      console.error('Error loading account data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !token) return;
    fetchAccountData();
  }, [userId, token]);

  // ✅ Add Address
  const handleAddAddress = async (formData) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      // assuming `payload` holds your address data
      await axios.post(`${SERVER_URL}/address/add`, {
        ...formData,
        userId,
      }, { headers });

      fetchAccountData();
    } catch (err) {
      console.error('Add Address Error:', err);
    }
  };

  // ✅ Update Address
  const handleUpdateAddress = async (addressId, formData) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      await axios.put(`${SERVER_URL}/address/update/${addressId}`, formData, { headers });

      fetchAccountData();
    } catch (err) {
      console.error('Update Address Error:', err);
    }
  };

  // ✅ Delete Address
  const handleDeleteAddress = async (addressId) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      await axios.delete(`${SERVER_URL}/address/delete/${addressId}`, { headers });

      fetchAccountData();
    } catch (err) {
      console.error('Delete Address Error:', err);
    }
  };

  return (
    <AccountUI
      loading={loading}
      addresses={addresses}
      cart={cart}
      onAddAddress={handleAddAddress}
      onEditAddress={handleUpdateAddress}
      onDeleteAddress={handleDeleteAddress}
    />
  );
};

export default AccountService;
