import React from 'react';
import { Link } from 'react-router-dom';
import { adminSidebarMenuItems } from '../../src/config';

const AdminSidebar = () => {
  return (
    <aside style={sidebarStyles}>
      <div style={logoStyles}>Zippy Admin</div>
      <nav style={navStyles}>
        {adminSidebarMenuItems.map((item) => (
          <Link key={item.id} to={item.path} style={linkStyles}>
            {item.label}
          </Link>
        ))}
        {/* Extra static items if needed */}
        <Link to="/admin/users" style={linkStyles}>Users</Link>
        <Link to="/admin/settings" style={linkStyles}>Settings</Link>
      </nav>
    </aside>
  );
};

// Styles
const sidebarStyles = {
  width: '240px',
  backgroundColor: '#000',
  color: '#fff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const logoStyles = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  marginBottom: '40px',
  color: '#00dfc4',
};

const navStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const linkStyles = {
  color: '#ccc',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '10px 0',
  transition: 'color 0.3s',
};

export default AdminSidebar;
