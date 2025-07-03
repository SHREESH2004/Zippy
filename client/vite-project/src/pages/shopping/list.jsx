import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../store/shop'; // Update the path as needed
import { ArrowDownUp, CircleDollarSign } from 'lucide-react';
import ProductCard from './Producttile';
import Filter from './filter';
import ProductDetailModal from './ProductDetailsMOdal';
function Listing() {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.shoppingProducts);

    const [sortBy, setSortBy] = useState('cost');
    const [isAsc, setIsAsc] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: [], brand: [] });  // Added filter state
    const [selectedProduct, setSelectedProduct] = useState(null);


    // Fetch products on mount and whenever filters change
    useEffect(() => {
        dispatch(fetchAllProducts(filters));
    }, [dispatch, filters]);

    // Receive filters from Filter component
    const handleApplyFilters = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (productId) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const handleRemoveFromCart = (productId) => {
        setQuantities(prev => {
            const current = prev[productId] || 0;
            if (current <= 1) {
                const { [productId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [productId]: current - 1 };
        });
    };

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'cost') {
            return isAsc ? a.price - b.price : b.price - a.price;
        }
        if (sortBy === 'date') {
            return isAsc
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    });

    const toggleSortDirection = () => setIsAsc(!isAsc);

    return (
        <>
            {/* Page layout with sidebar and main content */}
            <div style={{ display: 'flex' }}>
                {/* Sidebar filter */}
                <Filter onApplyFilters={handleApplyFilters} />

                {/* Main content container */}
                <div style={styles.container}>
                    {/* Title + search bar */}
                    <div style={styles.titleSearchWrapper}>
                        <h2 style={styles.title}>
                            Discover <span style={{ ...styles.highlight, color: '#28a745' }}>Premium Picks</span> at{' '}
                            <span style={{ ...styles.highlight, color: '#ff9800' }}>Best Deals</span>
                            <CircleDollarSign
                                size={24}
                                style={{
                                    verticalAlign: 'middle',
                                    marginLeft: '3px',
                                    marginRight: '3px',
                                    color: '#ff9800'
                                }}
                            />
                            only on <span style={{ ...styles.brand, color: '#0069d9' }}>Zippy</span>
                        </h2>

                        <input
                            type="text"
                            placeholder="Search best deals on Zippy — products, brands & more..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    {/* Sorting bar */}
                    <div style={styles.topBar}>
                        <div>
                            Showing <strong>{sortedProducts.length}</strong> products
                        </div>

                        <div style={styles.sortSection}>
                            <label htmlFor="sortSelect" style={styles.sortLabel}>Sort by:</label>
                            <select
                                id="sortSelect"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
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
                                    transform: isAsc ? 'rotate(0deg)' : 'rotate(180deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                                onClick={toggleSortDirection}
                                title={isAsc ? 'Ascending' : 'Descending'}
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div style={styles.grid}>
                        {isLoading ? (
                            <p>Loading products...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>Error: {error}</p>
                        ) : (
                            sortedProducts.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    hoveredId={hoveredId}
                                    setHoveredId={setHoveredId}
                                    quantity={quantities[product._id] || 0}
                                    onAddToCart={handleAddToCart}
                                    onRemoveFromCart={handleRemoveFromCart}
                                    styles={styles}
                                    onSelect={setSelectedProduct}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Product detail modal overlay */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    quantity={quantities[selectedProduct._id] || 0}
                />
            )}


        </>
    );

}

const styles = {
    titleSearchWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        gap: '24px',
    },

    searchInput: {
        flexShrink: 0,
        width: '500px',   // increased from 320px to 560px (1.75x)
        padding: '12px 20px',
        borderRadius: '30px',
        border: '2px solid #28a745',
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: "'Poppins', sans-serif",
        color: '#333',
        backgroundColor: '#f9fff9',
        boxShadow: '0 4px 15px rgba(40,167,69,0.25)',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },


    searchInputFocus: {
        borderColor: '#1c7c2d',
        boxShadow: '0 0 8px 3px rgba(28,124,45,0.6)',
    },

    // Existing styles...
    actionRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '14px',
    },

    removeButton: {
        padding: '6px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(220,53,69,0.15)',
        fontFamily: "'Poppins', sans-serif",
    },

    addButton: {
        padding: '6px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0,123,255,0.2)',
        fontFamily: "'Poppins', sans-serif",
    },

    quantityText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#28a745',
        fontFamily: "'Poppins', sans-serif",
    },
    container: {
        position: 'fixed',
        top: '64px',        // just below your topbar (assuming 64px height)
        left: '280px',      // as before
        right: 0,
        bottom: 0,          // container ends at viewport bottom (no extra padding)
        width: 'calc(100% - 280px)',
        padding: '32px 32px 32px 16px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
        zIndex: 10,
        minHeight: 'calc(100vh - 64px)',  // height fills viewport below topbar exactly
    },





    title: {
        margin: 0,
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
        gridTemplateColumns: 'repeat(4, 320px)', // 4 cards per row, each 320px
        gap: '50px',                             // larger spacing between cards
        padding: '24px 0',
        justifyContent: 'center',                // center the full grid
    },



    card: {
        width: '320px',            // reduced width
        height: '490px',           // fixed height
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




    image: {
        width: '100%',
        height: '350px',
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
