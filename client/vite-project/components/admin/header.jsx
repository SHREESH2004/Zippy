import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Show success toast
    toast.success('Logout successful!');

    // Redirect to login
    navigate('/login');
  };

  return (
    <header style={styles.topbar}>
      <div style={styles.welcome}>👋 Welcome back, Admin</div>
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#00bfa6')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#00dfc4')}
      >
        Logout
      </button>
    </header>
  );
};

// Styles
const styles = {
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #f9f9f9, #ffffff)',
    padding: '20px 32px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid #e0e0e0',
    fontFamily: 'Inter, sans-serif',
    zIndex: 100,
  },
  welcome: {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#2c3e50',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#00dfc4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.95rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};

export default AdminHeader;
