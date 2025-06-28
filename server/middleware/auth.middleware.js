import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export const authMiddleware = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  const cookieToken = req.cookies?.token;
  const token = cookieToken || (bearerToken?.startsWith('Bearer ') ? bearerToken.split(' ')[1] : null);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error');

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Login to Authenticate' });
    }

    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
};
