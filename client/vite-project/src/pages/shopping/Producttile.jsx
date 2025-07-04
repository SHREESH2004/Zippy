import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../../store/cart';

function ProductCard({
  product,
  hoveredId,
  setHoveredId,
  quantity,
  styles,
  onSelect,
  onAddToCart,
  onRemoveFromCart,
}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const isDiscounted = product.salePrice > product.price;

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    onSelect && onSelect(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!userId) {
      console.warn("User not logged in");
      return;
    }
    if (quantity > 0) {
      dispatch(updateCart({ userId, productId: product._id, quantityChange: 1 }));
    } else {
      dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
    }
    onAddToCart && onAddToCart(product._id);
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (!userId) {
      console.error('User not logged in');
      return;
    }
    dispatch(updateCart({ userId, productId: product._id, quantityChange: -1 }));
    onRemoveFromCart && onRemoveFromCart(product._id);
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
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHoveredId(product._id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={handleCardClick}
    >
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
        style={styles.image}
      />

      <p
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#666',
          margin: '4px 0',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {product.title}
      </p>

      <h3 style={styles.productName}>{product.name}</h3>

      <div>
        {isDiscounted && (
          <span
            style={{
              textDecoration: 'line-through',
              color: '#999',
              fontSize: '13px',
              marginRight: '8px',
            }}
          >
            ${product.salePrice.toFixed(2)}
          </span>
        )}
        <span style={styles.price}>${product.price.toFixed(2)}</span>
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
          onClick={handleAddToCart}
          disabled={quantity >= product.totalStock}
        >
          + Add
        </button>

        {quantity > 0 && (
          <>
            <span style={styles.quantityText}>x{quantity}</span>
            <button style={styles.removeButton} onClick={handleRemoveFromCart}>
              − Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
