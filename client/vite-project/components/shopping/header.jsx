import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HousePlus,
  LogOut,
  ShoppingCart,
  AlignJustify
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { shoppingviewMenuItems } from '../../src/config';
import { CircleUserRound } from 'lucide-react';
const ShoppingHeader = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const username = auth?.user?.username;

  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    navigate('/login');
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('');
  };

  return (
    <header style={headerStyles}>
      {/* Left: Logo + Hi Username */}
      <div style={leftSection}>
        <div style={logoStyles}>Zippy</div>
        {username && (
          <div
            style={hiUsernameStyles}
            className="hi-username"
            title={`Hello, ${username}!`}
          >
            Hi, <span style={{ fontWeight: '700' }}>{username}</span>
          </div>
        )}
      </div>

      {/* Center: Shopping Menu Items */}
      <nav style={centerSection}>
        {shoppingviewMenuItems.map((item) => (
          <Link
            key={item.id}
            to={`${item.path}?category=${item.id}`}
            style={{
              ...menuLinkStyles,
              ...(hoveredItem === item.id ? hoveredMenuStyle : {})
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right: Icons + User Circle */}
      <div style={rightSection}>
        <Link to="/shopping/profile" style={iconLinkStyles} title="Home"><CircleUserRound /></Link>
        <Link to="/shopping/cart" style={iconLinkStyles} title="Cart"><ShoppingCart /></Link>
        <Link to="/shopping/checkout" style={iconLinkStyles} title="Menu"><AlignJustify /></Link>

        {username && (
          <div style={{ position: 'relative' }}>
            <div
              onClick={toggleLogout}
              title={username}
              className="user-circle"
            >
              {getInitials(username)}
            </div>

            {showLogout && (
              <button
                onClick={handleLogout}
                style={logoutButtonStyles}
              >
                <LogOut style={{ marginRight: 6 }} /> Logout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Inline CSS for hover effects */}
      <style>{`
        /* User Circle */
        .user-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #fff;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          user-select: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          border: 2px solid transparent;
        }
        .user-circle:hover {
          background-color: #00dfc4;
          color: #fff;
          box-shadow: 0 6px 22px rgba(0, 223, 196, 0.75);
          border-color: #00b8a9;
          transform: scale(1.1);
        }

        /* Hi Username Text */
        .hi-username {
          transition: color 0.3s ease, text-decoration 0.3s ease;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          user-select: none;
          color: #00dfc4;
        }
        .hi-username:hover {
          color: #fff;
          text-decoration: underline;
          background-color: rgba(0, 223, 196, 0.15);
        }

        /* Menu Links */
        nav a:hover {
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 36px',
  backgroundColor: '#000',
  color: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  fontFamily: `'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`,
  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.7)',
};

const leftSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flex: '0 0 auto',
};

const hiUsernameStyles = {
  fontSize: '1.1rem',
  fontWeight: '500',
  userSelect: 'none',
};

const centerSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  flex: '1 1 auto',
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
  flex: '0 0 auto',
};

const logoStyles = {
  fontSize: '2.2rem',
  fontWeight: '700',
  color: '#fff',
  textShadow: '0 0 8px #00dfc4',
  cursor: 'default',
  userSelect: 'none',
  transition: 'text-shadow 0.3s ease',
};

const iconLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.3rem',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
};

const menuLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.05rem',
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: '500',
  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
  userSelect: 'none',
};

const hoveredMenuStyle = {
  backgroundColor: '#00dfc4',
  color: '#000',
  transform: 'translateY(-3px) scale(1.05)',
  boxShadow: '0 8px 15px rgba(0, 223, 196, 0.35)',
};

const logoutButtonStyles = {
  position: 'absolute',
  top: '52px',
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '8px 14px',
  color: '#000',
  fontWeight: '600',
  fontSize: '0.95rem',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
  zIndex: 1100,
};

export default ShoppingHeader;
