import React from 'react';

function ProductCard({
    product,
    hoveredId,
    setHoveredId,
    quantity,
    onAddToCart,
    onRemoveFromCart,
    styles
}) {
    const isDiscounted = product.salePrice > product.price;

    return (
        <div
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
            <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                style={styles.image}
            />
            
            <h3 style={styles.productName}>{product.name}</h3>

            {/* Show price with optional strikethrough sale price */}
            <div>
                {isDiscounted && (
                    <span style={{
                        textDecoration: 'line-through',
                        color: '#999',
                        fontSize: '13px',
                        marginRight: '8px',
                    }}>
                        ${product.salePrice.toFixed(2)}
                    </span>
                )}
                <span style={{
                    color: '#007bff',
                    fontWeight: 'bold',
                    fontSize: '14.5px'
                }}>
                    ${product.price.toFixed(2)}
                </span>
            </div>

            {/* Stock display */}
            <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                Stock: {product.totalStock}
            </p>

            {/* Date added */}
            <p style={styles.date}>Added: {new Date(product.date).toLocaleDateString()}</p>

            {/* Action row: add/remove cart */}
            <div style={styles.actionRow}>
                <button
                    style={styles.addButton}
                    onClick={() => onAddToCart(product.id)}
                    disabled={quantity >= product.totalStock}
                >
                    + Add
                </button>

                {quantity > 0 && (
                    <>
                        <span style={styles.quantityText}>x{quantity}</span>
                        <button
                            style={styles.removeButton}
                            onClick={() => onRemoveFromCart(product.id)}
                        >
                            − Remove
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
