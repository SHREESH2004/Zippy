import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut,
  ShoppingCart,
  AlignJustify,
  CircleUserRound,
  User,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { shoppingviewMenuItems } from '../../src/config';
import CartContainer from '../../src/pages/shopping/CartContainer';

const ShoppingHeader = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const username = auth?.user?.username;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    navigate('/login');
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const toggleSidebar = () => setShowSidebar(prev => !prev);

  const getInitials = (name) => {
    if (!name) return '';
    return name.trim().split(' ').slice(0, 2).map(p => p[0].toUpperCase()).join('');
  };

  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.trim().split(' ')[0];
  };

  return (
    <>
      <header style={headerStyles} className="shadow-lg backdrop-blur-md border-b border-gray-100">
        <div style={leftSection}>
          <div style={{ ...containerStyles, cursor: 'pointer' }} onClick={() => window.location.reload()}>
            <div style={{ ...logoStyles }}>Zippy</div>
            <ShoppingBag width={32} height={32} className="text-primary" />
          </div>

          <button className="menu-toggle" onClick={toggleSidebar}>
            <AlignJustify size={24} />
          </button>

          {username && (
            <button className="hi-user-btn" onClick={() => navigate('/shopping/profile')}>
              Hi, <strong>{getFirstName(username)}</strong>
            </button>
          )}
        </div>
        <nav style={centerSection} className="menu-desktop">
          {shoppingviewMenuItems.map((item) => (
            <Link
              key={item.id}
              to={`${item.path}`}
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

          {/* ✅ Cart button placed beside menu items */}
        </nav>


        <div style={rightSection}>
          <Link to="/shopping/profile" className="icon-link" title="Profile">
            <CircleUserRound />
          </Link>

          {/* ✅ Add Cart Container beside Profile */}
          <div style={{ marginLeft: '8px' }}>
            <CartContainer />
          </div>

          {username && (
            <div style={{ position: 'relative' }}>
              <div className="user-circle" onClick={toggleDropdown}>
                {getInitials(username)}
              </div>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={() => navigate('/shopping/profile')}>
                    <User size={16} style={{ marginRight: 6 }} /> My Account
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 6 }} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </header>

      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="font-semibold text-lg">Zippy Menu</span>
          <button onClick={toggleSidebar} className="text-xl">✕</button>
        </div>

        <div className="sidebar-links">
          <div className="sidebar-menu-section">
            {shoppingviewMenuItems.map((item) => (
              <Link key={item.id} to={`${item.path}?category=${item.id}`} onClick={toggleSidebar}>
                {item.label}
              </Link>
            ))}
          </div>

          {username && (
            <>
              <hr />
              <button onClick={() => { toggleSidebar(); navigate('/shopping/profile'); }}>
                <User size={16} style={{ marginRight: 6 }} /> Profile
              </button>
              <button onClick={() => { toggleSidebar(); handleLogout(); }}>
                <LogOut size={16} style={{ marginRight: 6 }} /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .hi-user-btn {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hi-user-btn:hover {
          background: #111;
          color: #fff;
        }

        .user-circle {
          width: 40px;
          height: 40px;
          background: #e0e0e0;
          color: #111;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #bbb;
        }

        .user-circle:hover {
          background: #00dfc4;
          transform: scale(1.05);
          color: #000;
        }

        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          min-width: 160px;
        }

        .dropdown button {
          background: none;
          border: none;
          padding: 12px 16px;
          font-size: 0.95rem;
          text-align: left;
          cursor: pointer;
          color: #333;
          display: flex;
          align-items: center;
        }

        .dropdown button:hover {
          background: #111;
          color: #fff;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #111;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          width: 280px;
          height: 100vh;
          background: #fff;
          color: #111;
          padding: 24px;
          box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
          transition: left 0.3s ease;
          z-index: 2000;
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sidebar-menu-section a {
          color: #111;
          text-decoration: none;
          padding: 10px 0;
          font-size: 1rem;
        }

        .sidebar-menu-section a:hover {
          background: #111;
          color: #fff;
          padding-left: 8px;
        }

        @media (max-width: 768px) {
          .menu-desktop {
            display: none;
          }

          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 32px',
  backgroundColor: '#fff',
  color: '#111',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const leftSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  color: '#111',
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  color: '#111',
};

const centerSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  flex: '1 1 auto',
  color: '#111',
};

const menuLinkStyles = {
  color: '#111',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '8px 14px',
  borderRadius: '6px',
  fontWeight: '500',
  transition: 'all 0.25s ease',
};

const hoveredMenuStyle = {
  backgroundColor: '#00dfc4',
  color: '#000',
  transform: 'translateY(-2px)',
  boxShadow: '0 6px 12px rgba(0, 223, 196, 0.25)',
};

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const logoStyles = {
  fontSize: '2.6rem',
  fontWeight: '700',
  color: '#000',
  fontFamily: `'Poppins', sans-serif`,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

export default ShoppingHeader;
