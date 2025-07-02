import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingHeader from './header';
import Filter from '../../src/pages/shopping/filter'; // Correct casing

const ShoppingLayout = () => {
  return (
    <div style={layoutStyles}>
      <ShoppingHeader />
      <main style={mainStyles}>
        <Outlet /> {/* All child routes render here */}
      </main>
      <Filter />
    </div>
  );
};

const layoutStyles = {
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
};

const mainStyles = {
  padding: '32px',
};

export default ShoppingLayout;
