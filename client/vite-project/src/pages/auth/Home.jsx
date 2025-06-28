import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    content: {
      maxWidth: '700px',
      animation: 'fadeIn 1.5s ease',
    },
    heading: {
      fontSize: '4rem',
      fontWeight: '800',
      marginBottom: '20px',
      letterSpacing: '1px',
    },
    highlight: {
      color: '#00c851', // 💚 green accent
    },
    subText: {
      fontSize: '1.25rem',
      color: '#aaa',
      marginBottom: '40px',
    },
    button: {
      backgroundColor: '#00c851', // green base
      color: '#fff',
      fontSize: '1rem',
      padding: '14px 40px',
      border: 'none',
      borderRadius: '40px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(0, 200, 81, 0.3)',
    },
    buttonHover: {
      backgroundColor: '#009f42', // darker green on hover
      boxShadow: '0 12px 36px rgba(0, 200, 81, 0.5)',
    },
  };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>
          Welcome to <span style={styles.highlight}>Zippy</span>
        </h1>
        <p style={styles.subText}>
          Your sleek, high-performance full-stack eCommerce platform.
        </p>
        <button
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Homepage;
