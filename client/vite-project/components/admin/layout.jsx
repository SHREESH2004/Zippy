import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './header';
import AdminSidebar from './sidebar';

const AdminLayout = () => {
  return (
    <div style={layoutStyles}>
      <AdminSidebar />
      <div style={mainContainerStyles}>
        <AdminHeader />
        <main style={contentStyles}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Styles
const layoutStyles = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif',
};

const mainContainerStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const contentStyles = {
  padding: '24px',
  backgroundColor: '#f9f9f9',
  flexGrow: 1,
};

export default AdminLayout;
