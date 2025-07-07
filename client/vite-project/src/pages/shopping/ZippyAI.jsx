import React, { useState } from 'react';
import axios from 'axios';

const ZippyChatPopup = ({ showFloating = true }) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    const current = { question: prompt, answer: '...' };
    setChatHistory((prev) => [...prev, current]);
    setPrompt('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/ai/zippy-chat', { prompt });
      const response = data?.response?.message || 'No response';
      const products = data?.response?.products || [];
      setChatHistory((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1 ? { ...item, answer: response, products } : item
        )
      );
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setChatHistory((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1
            ? { ...item, answer: '❌ Failed to get response.', products: [] }
            : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showFloating && (
        <button
          onClick={() => setOpen(true)}
          style={styles.floatingBtn}
        >
          💬 Zippy AI 🛒
        </button>
      )}

      {open && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✖</button>
            <h2 style={styles.heading}>Zippy AI Assistant 🛍️</h2>

            {chatHistory.length === 0 && (
              <div style={styles.guidelinesBox}>
                <h4 style={styles.guidelinesTitle}>✨ How to Ask Zippy</h4>
                <ul style={styles.guidelinesList}>
                  <li><strong>📝 </strong> <code>description: fifa 2006</code></li>
                  <li><strong>🏷️ </strong> <code>brand: Nike</code></li>
                  <li><strong>👕 </strong> <code>category: Men</code></li>
                  <li><strong>💰 </strong> <code>price: under $1500</code></li>
                </ul>
              </div>
            )}


            <div style={styles.chatBox}>
              {chatHistory.map((entry, idx) => (
                <div key={idx} style={styles.chatEntry}>
                  <div style={styles.userMsg}>🧑‍💻 {entry.question}</div>
                  <div style={styles.botMsg}>🤖 {entry.answer}</div>
                  {entry.products?.map((prod) => (
                    <div
                      key={prod._id}
                      style={{ ...styles.productCard }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    >
                      <img src={prod.image} alt={prod.title} style={styles.productImg} />
                      <div>
                        <div style={styles.productTitle}>{prod.title}</div>
                        <div style={styles.productPrice}>
                          ${prod.price}
                          <span style={styles.lineThrough}> ${prod.salePrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              placeholder="Type your product search here..."
              style={styles.textarea}
            />

            <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  floatingBtn: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: 'linear-gradient(to right, #22c55e, #86efac)',
    color: '#fff',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '999px',
    fontWeight: 'bold',
    fontSize: '16px',
    zIndex: 9999,
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  popup: {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    width: '560px',
    height: '88vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '22px',
    color: '#16a34a',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  heading: {
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: '18px',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '12px',
    padding: '10px',
    border: '1px solid #d3f9d8',
    borderRadius: '14px',
    background: '#fafff6',
  },
  chatEntry: {
    marginBottom: '16px',
  },
  userMsg: {
    background: '#dcfce7',
    padding: '10px 14px',
    borderRadius: '10px',
    marginBottom: '6px',
    maxWidth: '90%',
    fontWeight: 500,
    color: '#166534',
    alignSelf: 'flex-end',
  },
  botMsg: {
    background: '#ecfdf5',
    padding: '10px 14px',
    borderRadius: '10px',
    marginBottom: '6px',
    maxWidth: '90%',
    fontWeight: 500,
    color: '#166534',
    alignSelf: 'flex-start',
  },
  textarea: {
    width: '100%',
    borderRadius: '10px',
    padding: '12px',
    border: '1px solid #a3e635',
    marginBottom: '12px',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
  },
  sendBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: '#22c55e',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
  productCard: {
    display: 'flex',
    gap: '12px',
    padding: '10px',
    borderRadius: '10px',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    marginTop: '6px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  productImg: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  productTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#15803d',
  },
  productPrice: {
    fontSize: '14px',
    color: '#444',
  },
  lineThrough: {
    textDecoration: 'line-through',
    color: '#999',
    marginLeft: '6px',
    fontSize: '13px',
  },
  guidelinesBox: {
    backgroundColor: '#f0fdf4',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #bbf7d0',
    marginBottom: '16px',
    color: '#166534',
    fontSize: '14px',
    lineHeight: '1.6',
    boxShadow: '0 4px 12px rgba(34,197,94,0.08)',
  },
  guidelinesTitle: {
    fontWeight: '600',
    fontSize: '15.5px',
    marginBottom: '10px',
    color: '#15803d',
  },
  guidelinesList: {
    paddingLeft: '20px',
    listStyle: 'disc',
  },
};

export default ZippyChatPopup;
