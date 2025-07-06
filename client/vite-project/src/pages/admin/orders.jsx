import React, { useState } from 'react';

const AdminOrders = () => {
  const [activeOrder, setActiveOrder] = useState(null);

  const orders = [
    { id: '#ORD1001', customer: 'Rohit Sharma', date: 'April 15, 2025', amount: '₹2,450', status: 'Delivered' },
    { id: '#ORD1002', customer: 'Anjali Mehta', date: 'April 14, 2025', amount: '₹1,980', status: 'Shipped' },
    { id: '#ORD1003', customer: 'Kunal Jain', date: 'April 13, 2025', amount: '₹5,320', status: 'Pending' },
    { id: '#ORD1004', customer: 'Sara Ali', date: 'April 12, 2025', amount: '₹3,760', status: 'Cancelled' },
  ];

  const openDetails = (order) => {
    setActiveOrder(order);
  };

  const closeDetails = () => {
    setActiveOrder(null);
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Admin Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order.id} style={rowStyles}>
            <span style={idStyle}>{order.id}</span>
            <span style={customerStyle}>{order.customer}</span>
            <button onClick={() => openDetails(order)} style={detailsBtn}>
              Details
            </button>
          </div>
        ))}
      </div>

      {activeOrder && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <h2 style={{ marginBottom: '1rem' }}>{activeOrder.id} Details</h2>
            <p><strong>Customer:</strong> {activeOrder.customer}</p>
            <p><strong>Date:</strong> {activeOrder.date}</p>
            <p><strong>Amount:</strong> {activeOrder.amount}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span style={{ ...statusTag, ...getStatusStyle(activeOrder.status) }}>
                {activeOrder.status}
              </span>
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button style={confirmBtn}>✅ Confirm</button>
              <button style={cancelBtn}>❌ Cancel</button>
              <button onClick={closeDetails} style={closeBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 🔧 Styles
const containerStyles = {
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
};

const headingStyles = {
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '2rem',
};

const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const idStyle = {
  fontWeight: '600',
  color: '#1f2937',
};

const customerStyle = {
  color: '#4b5563',
};

const detailsBtn = {
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
};

// 🪟 Modal
const modalBackdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const modalContent = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  width: '400px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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
  padding: '0.25rem 0.75rem',
  borderRadius: '1rem',
  fontSize: '0.85rem',
  fontWeight: '600',
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
    default:
      return { backgroundColor: '#f3f4f6', color: '#4b5563' };
  }
};

export default AdminOrders;
