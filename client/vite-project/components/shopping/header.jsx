import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut,
  ShoppingCart,
  AlignJustify,
  CircleUserRound,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { shoppingviewMenuItems } from '../../src/config';
import { Truck, ShoppingBag } from 'lucide-react';

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

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('');
  };
  const truckSize = 32;
  return (
    <>
      <header style={headerStyles}>
        <div style={leftSection}>
          <div style={containerStyles}>
            <div style={{ ...logoStyles, fontSize: `${truckSize}px` }}>Zippy</div>
            <ShoppingBag width={truckSize} height={truckSize} />
          </div>

          <button className="menu-toggle" onClick={toggleSidebar}>
            <AlignJustify size={24} />
          </button>

          {username && (
            <button
              className="hi-user-btn"
              onClick={() => navigate('/shopping/profile')}
            >
              <strong>{username}</strong>
            </button>
          )}
        </div>

        <nav style={centerSection} className="menu-desktop">
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

        <div style={rightSection}>
          <Link to="/shopping/profile" className="icon-link" title="Profile">
            <CircleUserRound />
          </Link>
          <Link to="/shopping/cart" className="icon-link" title="Cart">
            <ShoppingCart />
          </Link>


          {username && (
            <div style={{ position: 'relative' }}>
              <div className="user-circle" onClick={toggleDropdown}>
                {getInitials(username)}
              </div>

              {showDropdown && (
                <div className="dropdown">
                  <button onClick={() => navigate('/shopping/profile')}>
                    <User size={16} style={{ marginRight: 6 }} /> Account
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 6 }} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Drawer */}
      {/* Sidebar Drawer */}
      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span>Zippy Menu</span>
          <button onClick={toggleSidebar}>✕</button>
        </div>

        <div className="sidebar-links">
          {/* Mobile-friendly vertical menu */}
          <div className="sidebar-menu-section">
            {shoppingviewMenuItems.map((item) => (
              <Link
                key={item.id}
                to={`${item.path}?category=${item.id}`}
                onClick={toggleSidebar}
              >
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


      {/* Styles */}
      <style>{`
        .hi-user-btn {
          margin-left: 12px;
          background: transparent;
          color: rgb(247, 246, 246);
          border: 2px rgb(14, 13, 13);
          padding: 6px 12px;
          font-size: 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hi-user-btn:hover {
          background-color: rgb(247, 252, 252);
          color: #000;
        }

        .user-circle {
          width: 42px;
          height: 42px;
          background: #fff;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }

        .user-circle:hover {
          background: #00dfc4;
          color: #fff;
          transform: scale(1.1);
        }

        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          min-width: 140px;
        }

        .dropdown button {
          background: transparent;
          border: none;
          padding: 10px 16px;
          text-align: left;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dropdown button:hover {
          background-color: #f3f3f3;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          width: 260px;
          height: 100vh;
          background: #111;
          color: white;
          padding: 24px;
          z-index: 2000;
          transition: left 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-size: 1.2rem;
        }
.icon-link {
  color: #888; /* default color */
  transition: color 0.3s ease;
}

.icon-link:hover {
  color: #00dfc4; /* accent color on hover */
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-menu-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.sidebar-menu-section a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.sidebar-menu-section a:hover {
  color: #00dfc4;
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

// Styles
const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 32px',
  backgroundColor: '#000',
  color: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const leftSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};



const centerSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  flex: '1 1 auto',
};

const menuLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '8px 14px',
  borderRadius: '6px',
  fontWeight: '500',
  transition: 'all 0.25s ease',
  userSelect: 'none',
};

const hoveredMenuStyle = {
  backgroundColor: '#00dfc4',
  color: '#000',
  transform: 'translateY(-2px)',
  boxShadow: '0 6px 12px rgba(0, 223, 196, 0.25)',
};
const containerStyles = {
  display: 'flex',
  alignItems: 'center',  // vertically center text and icon
  gap: '0.4rem',          // some space between text and icon
};

const logoStyles = {
  fontSize: '2.8rem',     // increase size to match icon height (adjust as needed)
  fontWeight: '700',
  color: '#ffffff',
  fontFamily: `'Poppins', sans-serif`,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  textShadow: '0 2px 5px rgba(0, 0, 0, 0.4)',
  margin: 0,
};

export default ShoppingHeader;
