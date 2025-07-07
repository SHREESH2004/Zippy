import { createOrder,getMyOrders,getAllOrders,getOrderById,updateOrderStatus } from "../controllers/orders.controller.js";
import express from 'express';
const router = express.Router();

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

export default router;