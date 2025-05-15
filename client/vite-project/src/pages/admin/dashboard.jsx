import React, { useState } from 'react';
import Products from './products';
import ImageUpload from './imageupload';

const AdminDashboard = () => {
  // State to handle visibility of the Products component
  const [showProducts, setShowProducts] = useState(false);

  // Toggle function for showing Products component
  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Dashboard</h1>

      {/* Button to toggle Products visibility */}
      <button style={toggleButtonStyles} onClick={toggleProducts}>
        {showProducts ? 'Hide Products' : 'Show Products'}
      </button>

      {/* Conditionally render the Products component */}
      {showProducts && <Products />}

      <div style={cardGridStyles}>
        <div style={cardStyles}>
          <h3 style={cardTitle}>Total Sales</h3>
          <p style={cardValue}>₹1,25,000</p>
        </div>
        <div style={cardStyles}>
          <h3 style={cardTitle}>Orders</h3>
          <p style={cardValue}>326</p>
        </div>
        <div style={cardStyles}>
          <h3 style={cardTitle}>Products</h3>
          <p style={cardValue}>87</p>
        </div>
        <div style={cardStyles}>
          <h3 style={cardTitle}>Customers</h3>
          <p style={cardValue}>540</p>
        </div>
      </div>

      {/* Image Upload Section */}
      <div style={sectionStyles}>
        <h2 style={subHeading}>Upload Product Image</h2>
        <ImageUpload />
      </div>

      <div style={sectionStyles}>
        <h2 style={subHeading}>Recent Orders</h2>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Order ID</th>
              <th style={thStyles}>Customer</th>
              <th style={thStyles}>Amount</th>
              <th style={thStyles}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyles}>#ORD1234</td>
              <td style={tdStyles}>Rohit Sharma</td>
              <td style={tdStyles}>₹2,450</td>
              <td style={tdStyles}>Delivered</td>
            </tr>
            <tr>
              <td style={tdStyles}>#ORD1235</td>
              <td style={tdStyles}>Anjali Mehta</td>
              <td style={tdStyles}>₹1,980</td>
              <td style={tdStyles}>Shipped</td>
            </tr>
            <tr>
              <td style={tdStyles}>#ORD1236</td>
              <td style={tdStyles}>Kunal Jain</td>
              <td style={tdStyles}>₹5,320</td>
              <td style={tdStyles}>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
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

const toggleButtonStyles = {
  backgroundColor: '#00dfc4',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginBottom: '20px',
};

const cardGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '40px',
};

const cardStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const cardTitle = {
  fontSize: '1.1rem',
  marginBottom: '10px',
  color: '#777',
};

const cardValue = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00dfc4',
};

const sectionStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  marginTop: '30px',
};

const subHeading = {
  fontSize: '1.3rem',
  marginBottom: '15px',
  color: '#333',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
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

export default AdminDashboard;
