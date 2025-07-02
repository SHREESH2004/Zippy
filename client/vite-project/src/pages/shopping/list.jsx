import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

function Listing() {
  const [sortBy, setSortBy] = useState('cost');
  const [isAsc, setIsAsc] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 59.99, date: '2023-08-15', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartwatch', price: 99.99, date: '2023-07-20', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bluetooth Speaker', price: 39.99, date: '2023-06-01', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'USB-C Charger', price: 19.99, date: '2023-05-10', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Wireless Mouse', price: 29.99, date: '2023-04-25', image: 'https://via.placeholder.com/150' },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'cost') {
      return isAsc ? a.price - b.price : b.price - a.price;
    }
    if (sortBy === 'date') {
      return isAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const toggleSortDirection = () => setIsAsc(!isAsc);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Listing</h2>

      {/* Top bar */}
      <div style={styles.topBar}>
        <div>
          Showing <strong>{products.length}</strong> products
        </div>
        <div style={styles.sortSection}>
          <label htmlFor="sortSelect" style={styles.sortLabel}>Sort by:</label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="cost">Cost</option>
            <option value="date">Date</option>
          </select>

          <ArrowDownUp
            size={20}
            style={{
              marginLeft: 8,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: isAsc ? 'rotate(0deg)' : 'rotate(180deg)',
              color: '#333',
            }}
            onClick={toggleSortDirection}
            title={isAsc ? 'Ascending' : 'Descending'}
          />
        </div>
      </div>

      {/* Product grid */}
      <div style={styles.grid}>
        {sortedProducts.map(product => (
          <div
            key={product.id}
            style={{
              ...styles.card,
              transform: hoveredId === product.id ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow:
                hoveredId === product.id
                  ? '0 8px 16px rgba(0,0,0,0.15)'
                  : '0 2px 5px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p style={styles.date}>Added: {new Date(product.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    margin: '0 0 16px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#222',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '24px',
    fontSize: '16px',
    color: '#555',
  },
  sortSection: {
    display: 'flex',
    alignItems: 'center',
  },
  sortLabel: {
    marginRight: 8,
    fontWeight: '600',
    color: '#333',
  },
  sortSelect: {
    padding: '6px 10px',
    borderRadius: '4px',
    border: '1.5px solid #ccc',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#fefefe',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  card: {
    height: '450px',
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '12px',
    borderRadius: '6px',
    objectFit: 'cover',
  },
  productName: {
    margin: '0 0 8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#222',
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    color: '#007bff',
    fontSize: '14px',
  },
  date: {
    marginTop: 'auto',
    fontSize: '12px',
    color: '#777',
  },
};

export default Listing;
