import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

function Listing() {
    const [sortBy, setSortBy] = useState('cost');
    const [isAsc, setIsAsc] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    const products = [
        { id: 1, name: 'Wireless Headphones', price: 59.99, date: '2023-08-15', image: '' },
        { id: 2, name: 'Smartwatch', price: 99.99, date: '2023-07-20', image: '' },
        { id: 3, name: 'Bluetooth Speaker', price: 39.99, date: '2023-06-01', image: '' },
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
            <h2 style={styles.title}>
                Discover <span style={styles.highlight}>Premium Picks</span> on <span style={styles.brand}>Zippy</span>
            </h2>





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
        position: 'fixed',
        top: '64px',
        left: '280px', // pushed further from sidebar
        right: 0,
        bottom: 0,
        width: 'calc(100% - 280px)', // adjusted accordingly
        padding: '32px 32px 32px 16px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
        zIndex: 10,
    },

    title: {
        margin: '0 0 32px',
        fontSize: '29px',
        fontWeight: 700,
        fontFamily: "'Poppins', sans-serif",
        color: '#111',
        letterSpacing: '-0.75px',
        lineHeight: '1.2',
        textAlign: 'left',
        transition: 'all 0.3s ease-in-out',
    },

    highlight: {
        color: '#28a745', // fresh, vibrant green (Bootstrap’s success green)
        fontWeight: 700,
        fontStyle: 'italic',
        letterSpacing: '-0.5px',
    },

    brand: {
        color: '#007bff', // Zippy's primary blue
        fontWeight: 800,
        letterSpacing: '-0.3px',
        textShadow: '0 1px 3px rgba(0, 123, 255, 0.25)',
    },


    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '12px 20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '32px',
        fontSize: '16px',
        color: '#555',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    },

    sortSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    sortLabel: {
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
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 cards per row
        gap: '28px',
    },

    card: {
        height: '380px', // slightly reduced
        backgroundColor: '#fff',
        padding: '14px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },

    cardHover: {
        transform: 'translateY(-6px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
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
        fontSize: '15px',
        fontWeight: '600',
        color: '#222',
    },

    price: {
        margin: 0,
        fontWeight: 'bold',
        color: '#007bff',
        fontSize: '13.5px',
    },

    date: {
        marginTop: 'auto',
        fontSize: '12px',
        color: '#777',
    },
};


export default Listing;
