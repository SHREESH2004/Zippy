import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const res = await axios.get(`${SERVER_URL}/orders`);

      setOrders(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('⚠️ Failed to fetch orders.');
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      await axios.put(`${SERVER_URL}/orders/${orderId}/status`, {
        status: newStatus,
      });

      fetchOrders();
      setActiveOrder(null);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update order status.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div style={headingStyles}>🔄 Loading orders...</div>;
  if (error) return <div style={headingStyles}>{error}</div>;

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>📦 Zippy Orders</h1>

      <div style={listContainer}>
        {orders.map((order) => (
          <div key={order._id} style={orderRow}>
            <div style={rowCol}><strong>Order ID:</strong> #{order._id.slice(-6)}</div>
            <div style={rowCol}><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
            <div style={rowCol}><strong>Amount:</strong> ${order.totalAmount}</div>
            <div style={rowCol}>
              <span style={{ ...statusTag, ...getStatusStyle(order.status) }}>{order.status}</span>
            </div>
            <button style={viewBtn} onClick={() => setActiveOrder(order)}>🔍 Details</button>
          </div>
        ))}
      </div>

      {activeOrder && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <h2 style={modalTitle}>Order #{activeOrder._id.slice(-6)}</h2>
            <p><strong>Date:</strong> {new Date(activeOrder.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{activeOrder.totalAmount}</p>
            <p><strong>Payment:</strong> {activeOrder.paymentMethod}</p>
            <p><strong>Status:</strong> <span style={{ ...statusTag, ...getStatusStyle(activeOrder.status) }}>{activeOrder.status}</span></p>
            <p><strong>Shipping To:</strong> {activeOrder.shippingAddress?.name}, {activeOrder.shippingAddress?.city}</p>
            <p><strong>Billing Address:</strong> {activeOrder.address?.name}, {activeOrder.address?.city}</p>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button style={confirmBtn} onClick={() => updateStatus(activeOrder._id, 'Delivered')}>✅ Mark Delivered</button>
              <button style={cancelBtn} onClick={() => updateStatus(activeOrder._id, 'Cancelled')}>❌ Cancel</button>
              <button onClick={() => setActiveOrder(null)} style={closeBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 🎨 Styles
const containerStyles = {
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
};

const headingStyles = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '2rem',
};

const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const orderRow = {
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  padding: '1rem 1.5rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '1rem',
};

const rowCol = {
  flex: '1 1 160px',
  color: '#374151',
  fontSize: '0.95rem',
};

const viewBtn = {
  padding: '0.4rem 1rem',
  backgroundColor: '#6366f1',
  color: '#fff',
  borderRadius: '8px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
};

// Modal styles
const modalBackdrop = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContent = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '14px',
  width: '500px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const modalTitle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#111827',
  marginBottom: '1rem',
};

const confirmBtn = {
  backgroundColor: '#10b981',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const cancelBtn = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const closeBtn = {
  backgroundColor: '#6b7280',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const statusTag = {
  padding: '0.3rem 0.8rem',
  borderRadius: '1rem',
  fontSize: '0.8rem',
  fontWeight: '600',
  display: 'inline-block',
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Delivered':
      return { backgroundColor: '#d1fae5', color: '#065f46' };
    case 'Shipped':
      return { backgroundColor: '#e0f2fe', color: '#0369a1' };
    case 'Pending':
      return { backgroundColor: '#fef9c3', color: '#92400e' };
    case 'Cancelled':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    case 'Confirmed':
      return { backgroundColor: '#ede9fe', color: '#6b21a8' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#4b5563' };
  }
};

export default AdminOrders;
