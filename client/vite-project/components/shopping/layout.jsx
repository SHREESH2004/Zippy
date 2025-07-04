import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ShoppingHeader from './header';
import Filter from '../../src/pages/shopping/filter';
import CartContainer from '../../src/pages/shopping/CartContainer';

const ShoppingLayout = () => {
  const location = useLocation();

  const isFilterVisible =
    location.pathname === '/shopping/home' || location.pathname === '/shopping/listing';

  return (
    <div style={styles.layout}>
      <div style={styles.headerWrapper}>
        <ShoppingHeader />
        <CartContainer />
      </div>

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
    overflow: 'hidden',
  },
  headerWrapper: {
    height: '60px',
    position: 'relative',
    zIndex: 10,
    flexShrink: 0,
  },
  contentWrapper: {
    display: 'flex',
    flexGrow: 1,
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
