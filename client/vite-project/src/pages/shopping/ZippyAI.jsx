import React, { useState } from 'react';
import axios from 'axios';

const ZippyChatPopup = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = {
    floatingBtn: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#f43f5e',
      color: '#fff',
      padding: '14px 24px',
      borderRadius: '999px',
      fontWeight: '600',
      fontSize: '16px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      zIndex: 9999,
      border: 'none',
    },
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9998,
    },
    popup: {
      backgroundColor: '#fff',
      width: '100%',
      maxWidth: '420px',
      borderRadius: '16px',
      padding: '24px',
      position: 'relative',
      boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
      animation: 'fadeIn 0.3s ease-in-out',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    closeBtn: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      color: '#f43f5e',
      cursor: 'pointer',
    },
    heading: {
      fontSize: '22px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#f43f5e',
      marginBottom: '20px',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #fda4af',
      outline: 'none',
      fontSize: '14px',
      resize: 'none',
      marginBottom: '12px',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#f43f5e',
      color: '#fff',
      fontWeight: '600',
      fontSize: '15px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '16px',
    },
    productCard: {
      display: 'flex',
      gap: '10px',
      border: '1px solid #eee',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    },
    productImg: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      objectFit: 'cover',
    },
    productTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#f43f5e',
      marginBottom: '2px',
    },
    productDesc: {
      fontSize: '12px',
      color: '#444',
    },
    productPrice: {
      fontSize: '13px',
      fontWeight: '500',
      marginTop: '4px',
      color: '#333',
    },
    lineThrough: {
      textDecoration: 'line-through',
      color: '#999',
      marginLeft: '6px',
    },
  };

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:3000/ai/zippy-chat', { prompt });
      setResponseData(data?.response || { message: "No response", products: [] });
    } catch (err) {
      console.error('Zippy AI Error:', err.message);
      setResponseData({ message: '❌ Something went wrong!', products: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button style={styles.floatingBtn} onClick={() => setOpen(true)}>
        💬 Zippy AI
      </button>

      {open && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <button
              style={styles.closeBtn}
              onClick={() => {
                setOpen(false);
                setPrompt('');
                setResponseData(null);
              }}
              aria-label="Close Zippy AI"
            >
              ✖
            </button>

            <div style={styles.heading}>Zippy AI Assistant</div>

            <textarea
              rows={3}
              placeholder="Try: Show me trending T-shirts under ₹500"
              style={styles.textarea}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button style={styles.button} onClick={handleSend} disabled={loading}>
              {loading ? 'Searching...' : 'Ask Zippy'}
            </button>

            {responseData && (
              <>
                <div style={{ fontSize: '14px', marginBottom: '10px', color: '#333' }}>
                  {responseData.message}
                </div>

                {responseData.products?.length > 0 ? (
                  responseData.products.map((prod) => (
                    <div key={prod._id} style={styles.productCard}>
                      <img src={prod.image} alt={prod.title} style={styles.productImg} />
                      <div>
                        <div style={styles.productTitle}>{prod.title}</div>
                        <div style={styles.productDesc}>{prod.description}</div>
                        <div style={styles.productPrice}>
                          ₹{prod.price}
                          {prod.salePrice && (
                            <span style={styles.lineThrough}>₹{prod.salePrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: '#999', textAlign: 'center' }}>
                    🕵️‍♀️ No products matched your query.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ZippyChatPopup;
