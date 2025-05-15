import React from 'react';

const AdminHeader = () => {
  return (
    <header style={topbarStyles}>
      <div style={welcomeStyles}>Welcome, Admin</div>
      <button style={logoutButtonStyles}>Logout</button>
    </header>
  );
};

// Styles
const topbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '16px 24px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

const welcomeStyles = {
  fontSize: '1.1rem',
  color: '#333',
};

const logoutButtonStyles = {
  padding: '8px 16px',
  backgroundColor: '#00dfc4',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};

export default AdminHeader;
