import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={big}>404</h1>
        <h2 style={message}>Oops! Page Not Found</h2>
        <p style={text}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/login" style={homeBtn}>
          Go back home
        </Link>
      </div>
    </div>
  );
};

// Styles
const wrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#000',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
};

const card = {
  maxWidth: '500px',
  backgroundColor: '#111',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const big = {
  fontSize: '5rem',
  margin: '0',
  color: '#00dfc4',
};

const message = {
  fontSize: '1.8rem',
  margin: '10px 0',
};

const text = {
  fontSize: '1rem',
  color: '#ccc',
  marginBottom: '30px',
};

const homeBtn = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#00dfc4',
  color: '#000',
  fontWeight: '600',
  textDecoration: 'none',
  borderRadius: '8px',
  transition: 'background 0.3s',
};

export default PageNotFound;
