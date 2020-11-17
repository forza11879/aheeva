import express from 'express';
import { addCall, fetchData } from '../controllers/call.js';

const router = express.Router();

// router.get('/', addCall);
router.get('/', fetchData);

export default router;
