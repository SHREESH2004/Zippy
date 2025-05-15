import React from 'react';

const AdminOrders = () => {
  const orders = [
    {
      id: '#ORD1001',
      customer: 'Rohit Sharma',
      date: 'April 15, 2025',
      amount: '₹2,450',
      status: 'Delivered',
    },
    {
      id: '#ORD1002',
      customer: 'Anjali Mehta',
      date: 'April 14, 2025',
      amount: '₹1,980',
      status: 'Shipped',
    },
    {
      id: '#ORD1003',
      customer: 'Kunal Jain',
      date: 'April 13, 2025',
      amount: '₹5,320',
      status: 'Pending',
    },
    {
      id: '#ORD1004',
      customer: 'Sara Ali',
      date: 'April 12, 2025',
      amount: '₹3,760',
      status: 'Cancelled',
    },
  ];

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Orders</h1>
      <div style={tableWrapper}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Order ID</th>
              <th style={thStyles}>Customer</th>
              <th style={thStyles}>Date</th>
              <th style={thStyles}>Amount</th>
              <th style={thStyles}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyles}>{order.id}</td>
                <td style={tdStyles}>{order.customer}</td>
                <td style={tdStyles}>{order.date}</td>
                <td style={tdStyles}>{order.amount}</td>
                <td style={tdStyles}>
                  <span style={{ ...statusTag, ...getStatusStyle(order.status) }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Status Tag Colors
const getStatusStyle = (status) => {
  switch (status) {
    case 'Delivered':
      return { backgroundColor: '#d4edda', color: '#155724' };
    case 'Shipped':
      return { backgroundColor: '#cce5ff', color: '#004085' };
    case 'Pending':
      return { backgroundColor: '#fff3cd', color: '#856404' };
    case 'Cancelled':
      return { backgroundColor: '#f8d7da', color: '#721c24' };
    default:
      return { backgroundColor: '#e2e3e5', color: '#383d41' };
  }
};

// 💅 Styles

const containerStyles = {
  padding: '20px',
  fontFamily: 'Segoe UI, sans-serif',
};

const headingStyles = {
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#333',
};

const tableWrapper = {
  overflowX: 'auto',
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '700px',
};

const thStyles = {
  textAlign: 'left',
  padding: '12px',
  backgroundColor: '#f2f2f2',
  color: '#333',
  fontWeight: '600',
  borderBottom: '1px solid #ddd',
};

const tdStyles = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  color: '#555',
};

const statusTag = {
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: '600',
};

export default AdminOrders;
