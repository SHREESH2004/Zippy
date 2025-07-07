import express from 'express';
import { handleZippyChat } from '../controllers/ai.controllers.js';

const router = express.Router();

router.post('/zippy-chat', handleZippyChat);

export default router;
