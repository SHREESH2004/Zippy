import React, { useState } from 'react';
import Products from './products';

const AdminDashboard = () => {
  const [showProducts, setShowProducts] = useState(false);

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Admin Dashboard</h1>

      <button style={toggleButtonStyles} onClick={toggleProducts}>
        {showProducts ? 'Hide Products' : 'Show Products'}
      </button>

      {showProducts && <Products />}

      <div style={cardGridStyles}>
        {dashboardStats.map((stat, i) => (
          <div key={i} style={cardStyles}>
            <h3 style={cardTitle}>{stat.title}</h3>
            <p style={cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={sectionStyles}>
        <h2 style={subHeading}>Recent Orders</h2>
        <table style={tableStyles}>
          <thead>
            <tr>
              {['Order ID', 'Customer', 'Amount', 'Status'].map((header, i) => (
                <th key={i} style={thStyles}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i}>
                <td style={tdStyles}>{order.id}</td>
                <td style={tdStyles}>{order.customer}</td>
                <td style={tdStyles}>{order.amount}</td>
                <td style={{ ...tdStyles, color: statusColor(order.status) }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Dashboard stats
const dashboardStats = [
  { title: 'Total Sales', value: '₹1,25,000' },
  { title: 'Orders', value: '326' },
  { title: 'Products', value: '87' },
  { title: 'Customers', value: '540' },
];

// Mock order data
const recentOrders = [
  { id: '#ORD1234', customer: 'Rohit Sharma', amount: '₹2,450', status: 'Delivered' },
  { id: '#ORD1235', customer: 'Anjali Mehta', amount: '₹1,980', status: 'Shipped' },
  { id: '#ORD1236', customer: 'Kunal Jain', amount: '₹5,320', status: 'Pending' },
];

// Status color function
const statusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return '#28a745';
    case 'Shipped':
      return '#ffc107';
    case 'Pending':
      return '#dc3545';
    default:
      return '#333';
  }
};

// Styles
const containerStyles = {
  padding: '30px',
  fontFamily: 'Inter, sans-serif',
  backgroundColor: '#f9f9fb',
  minHeight: '100vh',
};

const headingStyles = {
  fontSize: '2.2rem',
  fontWeight: '700',
  marginBottom: '25px',
  color: '#1e1e2f',
};

const toggleButtonStyles = {
  backgroundColor: '#4f46e5',
  color: '#fff',
  border: 'none',
  padding: '10px 18px',
  fontSize: '1rem',
  fontWeight: '500',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginBottom: '30px',
};

const cardGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  marginBottom: '40px',
};

const cardStyles = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s',
  textAlign: 'center',
};

const cardTitle = {
  fontSize: '1rem',
  marginBottom: '8px',
  color: '#6b7280',
};

const cardValue = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: '#4f46e5',
};

const sectionStyles = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
};

const subHeading = {
  fontSize: '1.3rem',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '20px',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyles = {
  textAlign: 'left',
  padding: '12px 16px',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  fontWeight: '600',
  borderBottom: '1px solid #e5e7eb',
};

const tdStyles = {
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0',
  color: '#4b5563',
};

export default AdminDashboard;
