import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingHeader = () => {
  return (
    <header style={headerStyles}>
      <div style={logoStyles}>Zippy</div>
      <nav style={navStyles}>
        <Link to="/home" style={linkStyles}>Home</Link>
        <Link to="/products" style={linkStyles}>Shop</Link>
        <Link to="/cart" style={linkStyles}>Cart</Link>
        <Link to="/login" style={linkStyles}>Login</Link>
      </nav>
    </header>
  );
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 32px',
  backgroundColor: '#000',
  color: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

const logoStyles = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#00dfc4',
};

const navStyles = {
  display: 'flex',
  gap: '20px',
};

const linkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'color 0.3s',
};

export default ShoppingHeader;
