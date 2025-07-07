import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ShoppingHeader from './header';
import Filter from '../../src/pages/shopping/filter';
import CartContainer from '../../src/pages/shopping/CartContainer';
import ZippyChatPopup from '../../src/pages/shopping/ZippyAI';

const ShoppingLayout = () => {
  const location = useLocation();

  // Filter only visible on listing page
  const isFilterVisible = location.pathname === '/shopping/listing';

  return (
    <div style={styles.layout}>
      {/* Fixed Header */}
      <div style={styles.headerWrapper}>
        <ShoppingHeader />
      </div>

      {/* Cart always visible */}
      <CartContainer />

      {/* Page Content */}
      <div style={styles.contentWrapper}>
        {isFilterVisible && (
          <aside style={styles.sidebar}>
            <Filter />
          </aside>
        )}
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>

      {/* 👇 Floating Zippy AI Chat Popup always available */}
      <ZippyChatPopup />
    </div>
  );
};

const styles = {
  layout: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  headerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    zIndex: 1000,
  },
  contentWrapper: {
    display: 'flex',
    flexGrow: 1,
    marginTop: '60px', // Push content below the header
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    padding: '16px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
    overflowY: 'auto',
  },
  main: {
    flexGrow: 1,
    backgroundColor: '#fff',
    overflowY: 'auto',
    padding: '24px',
  },
};

export default ShoppingLayout;
