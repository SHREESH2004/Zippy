import React from 'react';

function ProductDetailModal({ product, onClose, onAddToCart, onRemoveFromCart, quantity = 0 }) {
    if (!product) return null;

    const isDiscounted = product.salePrice > product.price;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>×</button>

                <img
                    src={product.image || 'https://via.placeholder.com/600'}
                    alt={product.name}
                    style={styles.image}
                />

                <h2 style={styles.name}>{product.name}</h2>
                <p style={styles.title}>{product.title}</p>

                <div style={styles.priceWrapper}>
                    {isDiscounted && (
                        <span style={styles.strikePrice}>${product.salePrice.toFixed(2)}</span>
                    )}
                    <span style={styles.price}>${product.price.toFixed(2)}</span>
                </div>

                <p style={styles.stock}>Stock: {product.totalStock}</p>
                <p style={styles.date}>
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                </p>

                {/* ✅ Product Description */}
                <div style={styles.description}>
                    <strong>Description:</strong>
                    <p>{product.description}</p>
                </div>

                {/* Add/Remove Cart Actions */}
                <div style={styles.cartRow}>
                    <button
                        style={styles.addButton}
                        onClick={() => onAddToCart(product._id)}
                        disabled={quantity >= product.totalStock}
                    >
                        + Add to Cart
                    </button>

                    {quantity > 0 && (
                        <>
                            <span style={styles.quantityText}>In Cart: {quantity}</span>
                            <button
                                style={styles.removeButton}
                                onClick={() => onRemoveFromCart(product._id)}
                            >
                                − Remove
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '32px 36px',
        width: '90%',
        maxWidth: '640px',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
        animation: 'fadeIn 0.3s ease-in-out',
        color: '#222',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        position: 'absolute',
        top: '16px',
        right: '20px',
        fontSize: '28px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: '#888',
        transition: 'color 0.3s ease',
    },
    image: {
        width: '100%',
        height: '360px',
        objectFit: 'cover',
        borderRadius: '14px',
        marginBottom: '24px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    },
    name: {
        margin: '0 0 12px',
        fontSize: '26px',
        fontWeight: '700',
        color: '#111',
        letterSpacing: '0.03em',
        textTransform: 'capitalize',
    },
    title: {
        fontSize: '17px',
        color: '#666',
        marginBottom: '14px',
        fontWeight: '500',
    },
    description: {
        marginTop: '8px',
        fontSize: '15px',
        color: '#444',
        lineHeight: '1.4',
        fontStyle: 'italic',
        fontWeight: '500',
        letterSpacing: '0.02em',
        maxHeight: '120px',
        overflowY: 'auto',
        paddingRight: '6px',
        borderLeft: '3px solid #007bff',
        paddingLeft: '12px',
        marginBottom: '20px',
    },
    priceWrapper: {
        fontSize: '20px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    strikePrice: {
        textDecoration: 'line-through',
        color: '#b0b0b0',
        fontSize: '16px',
    },
    price: {
        fontWeight: '700',
        color: '#007bff',
        fontSize: '22px',
    },
    stock: {
        fontSize: '14px',
        color: '#444',
        fontWeight: '600',
    },
    date: {
        fontSize: '12px',
        color: '#777',
        marginTop: '10px',
        fontWeight: '400',
    },
    cartRow: {
        marginTop: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'flex-start',
    },
    addButton: {
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 12px rgba(0,123,255,0.4)',
        transition: 'background-color 0.3s ease',
    },
    removeButton: {
        padding: '12px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 12px rgba(220,53,69,0.4)',
        transition: 'background-color 0.3s ease',
    },
    quantityText: {
        fontSize: '16px',
        color: '#28a745',
        fontWeight: '700',
        fontFamily: "'Poppins', sans-serif",
    },
};


export default ProductDetailModal;
