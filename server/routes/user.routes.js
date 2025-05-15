import express from 'express';
import { registerUser, logiUser, logoutUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', logiUser);

// Logout Route
router.post('/logout', authMiddleware,logoutUser);

// Check Auth Route
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'User is authenticated',
        user
    });
});

export default router;
