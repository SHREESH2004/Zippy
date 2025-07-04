import express from 'express';
import { addToCart, getCart, updateCart, deleteCart } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.patch('/update', authMiddleware, updateCart);
router.delete('/delete', authMiddleware, deleteCart);

export default router;
