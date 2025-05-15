import { Navigate, useLocation } from "react-router-dom";

function Checks({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  if (!isAuthenticated && !path.includes('/login') && !path.includes('/register')) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && (path.includes('/login') || path.includes('/register'))) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shopping/home" replace />;
    }
  }

  if (isAuthenticated && user?.role !== 'admin' && path.includes('/admin')) {
    return <Navigate to="/un-auth" replace />;
  }

  if (isAuthenticated && user?.role === 'admin' && path.includes('/shopping')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>; 
}

export default Checks;
