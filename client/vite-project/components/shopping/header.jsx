import React from 'react';
import { Link } from 'react-router-dom';
import { HousePlus ,ShoppingBasket,BaggageClaim,LogOut,Store,ShoppingCart} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShoppingHeader = () => {
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
    <header style={headerStyles}>
      <div style={logoStyles}>Zippy</div>
      <nav style={navStyles}>
        <Link to="/home" style={linkStyles}><HousePlus /></Link>
        <Link to="/products" style={linkStyles}><Store /></Link>
        <Link to="/cart" style={linkStyles}><ShoppingCart /></Link>
        <span onClick={handleLogout} style={{ ...linkStyles, cursor: 'pointer' }}>
          <LogOut />
        </span>
      </nav>
    </header>
  );
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 32px',
  backgroundColor: '#000',
  color: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

const logoStyles = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#00dfc4',
};

const navStyles = {
  display: 'flex',
  gap: '20px',
};

const linkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'color 0.3s',
};

export default ShoppingHeader;
