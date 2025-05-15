import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth-slice'; // Make sure this path is correct
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(register(formData)).unwrap(); 
      if (response.success) {
        navigate('/login');
      } else {
        console.log(response.message || 'Registration failed');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div style={pageStyles}>
      {/* Zippy Left Side with Black Background */}
      <div style={leftSideStyles}>
        <h1 style={headingStyles}>Zippy</h1>
      </div>

      {/* Register Form Card Right Side */}
      <div style={rightSideStyles}>
        <div style={cardStyles}>
          <h2 style={titleStyles}>Create Your Account</h2>
          <p style={subtitleStyles}>Join us and start shopping smarter.</p>
          <form onSubmit={handleRegister}>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Username</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter your username"
              />
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter your email"
              />
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Create a password"
              />
            </div>
            <button type="submit" style={buttonStyles}>Sign Up</button>
          </form>
          <p style={footerStyles}>
            Already have an account? <Link to="/login" style={linkStyles}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// 🖤 Dark Theme UI Styles

const pageStyles = {
  display: 'flex',
  height: '100vh',
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
};

const leftSideStyles = {
  backgroundColor: '#000',
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  padding: '40px',
};

const rightSideStyles = {
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
};

const headingStyles = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
};

const cardStyles = {
  backgroundColor: '#fff',
  padding: '40px 35px',
  borderRadius: '14px',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  width: '100%',
  maxWidth: '420px',
  textAlign: 'center',
};

const titleStyles = {
  fontSize: '1.9rem',
  color: '#111',
  marginBottom: '8px',
};

const subtitleStyles = {
  fontSize: '1rem',
  color: '#666',
  marginBottom: '25px',
};

const inputGroupStyles = {
  marginBottom: '20px',
  textAlign: 'left',
};

const labelStyles = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '0.95rem',
  color: '#333',
  fontWeight: 500,
};

const inputStyles = {
  width: '100%',
  padding: '12px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none',
  transition: 'all 0.2s ease-in-out',
  boxSizing: 'border-box',
};

inputStyles[':focus'] = {
  borderColor: '#00e676',
  boxShadow: '0 0 0 2px rgba(0, 230, 118, 0.2)',
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#00e676',
  color: '#000',
  fontSize: '1.1rem',
  fontWeight: 600,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
};

const footerStyles = {
  marginTop: '20px',
  color: '#555',
  fontSize: '0.9rem',
};

const linkStyles = {
  color: '#00e676',
  fontWeight: '600',
  textDecoration: 'none',
};
