import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export const authMiddleware = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 

    next(); 
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

