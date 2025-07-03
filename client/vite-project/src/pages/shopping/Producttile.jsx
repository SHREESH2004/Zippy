import React from 'react';

function ProductCard({
    product,
    hoveredId,
    setHoveredId,
    quantity,
    onAddToCart,
    onRemoveFromCart,
    styles,
    onSelect // ✅ Add this
}) {
    const isDiscounted = product.salePrice > product.price;

    // Prevent modal trigger on button clicks
    const handleCardClick = (e) => {
        // If the click target is a button or inside a button, do nothing
        if (
            e.target.tagName === 'BUTTON' ||
            e.target.closest('button')
        ) return;

        onSelect && onSelect(product); // ✅ Trigger modal
    };

    return (
        <div
            style={{
                ...styles.card,
                transform: hoveredId === product._id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow:
                    hoveredId === product._id
                        ? '0 8px 16px rgba(0,0,0,0.15)'
                        : '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer', // ✅ Make it feel clickable
            }}
            onMouseEnter={() => setHoveredId(product._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={handleCardClick} // ✅ Handles modal open
        >
            <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                style={styles.image}
            />

            <p style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                margin: '4px 0',
                fontFamily: "'Poppins', sans-serif",
            }}>
                {product.title}
            </p>

            <h3 style={styles.productName}>{product.name}</h3>

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
                <span style={styles.price}>
                    ${product.price.toFixed(2)}
                </span>
            </div>

            <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                Stock: {product.totalStock}
            </p>

            <p style={styles.date}>
                Added: {new Date(product.createdAt).toLocaleDateString()}
            </p>

            <div style={{ ...styles.actionRow, marginTop: 'auto' }}>
                <button
                    style={styles.addButton}
                    onClick={(e) => {
                        e.stopPropagation(); // ✅ prevent modal
                        console.log('Added product:', product); // <-- Log product added
                        onAddToCart(product._id);
                    }}
                    disabled={quantity >= product.totalStock}
                >
                    + Add
                </button>

                {quantity > 0 && (
                    <>
                        <span style={styles.quantityText}>x{quantity}</span>
                        <button
                            style={styles.removeButton}
                            onClick={(e) => {
                                e.stopPropagation(); // ✅ prevent modal
                                onRemoveFromCart(product._id);
                            }}
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
