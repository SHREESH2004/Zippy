import React from 'react';
import ShoppingHeader from './header';
import Filter from '../../src/pages/shopping/filter';
import Listing from '../../src/pages/shopping/list';
import CartPopup from '../../src/pages/shopping/cardpopup';
const ShoppingLayout = () => {
  return (
    <div style={styles.layout}>
      <ShoppingHeader />
      <div style={styles.contentWrapper}>
        <aside style={styles.sidebar}>
          <Filter />
        </aside>
        <main style={styles.main}>
          <div style={styles.listingWrapper}>
            <Listing />
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contentWrapper: {
    display: 'flex',
    flexGrow: 1,
    marginTop: '60px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    padding: '16px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
  },
  main: {
    flexGrow: 1,
    padding: '2px 24px 24px 24px',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  listingWrapper: {
    marginTop: '-12px',
  },
};

export default ShoppingLayout;
