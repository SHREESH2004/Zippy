import React from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify'; // ✅ Only toast, no container here

const CartPopup = ({ cartItems, totalPrice, onAdd, onRemove, onBuyNow, onClose }) => {
  const handleCheckout = () => {
    toast.success('🛍️ Checkout successful!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    onBuyNow();
  };

  const styles = {
    cartPopup: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100%',
      padding: '30px 30px 20px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      overflowY: 'auto',
      color: '#111',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      position: 'relative',
      paddingBottom: '16px',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#222',
    },
    closeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '50%',
      transition: 'background 0.2s ease',
    },
    cartItem: {
      background: '#fff',
      borderRadius: '14px',
      padding: '16px',
      marginBottom: '20px',
      display: 'flex',
      gap: '14px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
      transition: 'transform 0.2s',
    },
    image: {
      width: '70px',
      height: '70px',
      objectFit: 'cover',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    itemInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    itemTitle: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#222',
    },
    itemDesc: {
      fontSize: '0.8rem',
      color: '#666',
    },
    itemPrice: {
      fontSize: '0.9rem',
      color: '#111',
      fontWeight: 500,
    },
    itemControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '8px',
    },
    btn: {
      background: '#111',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      width: '28px',
      height: '28px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease-in-out',
    },
    quantity: {
      minWidth: '24px',
      textAlign: 'center',
      fontSize: '1rem',
      fontWeight: 500,
    },
    empty: {
      fontStyle: 'italic',
      color: '#777',
      fontSize: '1rem',
      textAlign: 'center',
      marginTop: '80px',
    },
    totalCard: {
      background: '#f1f5ff',
      borderRadius: '14px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(0, 114, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#0047ab',
    },
    checkoutBtn: {
      width: '100%',
      padding: '14px 20px',
      fontSize: '1rem',
      background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    checkoutBtnDisabled: {
      background: '#ccc',
      color: '#666',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.cartPopup}>
      <div style={styles.header}>
        <h2 style={styles.title}>🛒 Your Cart</h2>
        <button
          onClick={onClose}
          style={styles.closeBtn}
          onMouseEnter={(e) => (e.target.style.background = '#eee')}
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          <X size={22} color="#333" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty. Add something cool! 😎</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.product.image} alt={item.product.title} style={styles.image} />
              <div style={styles.itemInfo}>
                <div>
                  <div style={styles.itemTitle}>{item.product.title}</div>
                  <div style={styles.itemDesc}>{item.product.description?.slice(0, 50)}...</div>
                  <div style={styles.itemPrice}>
                    ${item.priceAtTime} × {item.quantity}
                  </div>
                </div>
                <div style={styles.itemControls}>
                  <button onClick={() => onRemove(item)} style={styles.btn}>−</button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button onClick={() => onAdd(item)} style={styles.btn}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div style={styles.totalCard}>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            style={{
              ...styles.checkoutBtn,
              ...(cartItems.length === 0 && styles.checkoutBtnDisabled),
            }}
          >
            🚀 Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPopup;
