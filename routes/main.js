import express from 'express';
import { fetchData } from '../controllers/call.js';

const router = express.Router();

router.get('/', fetchData);

export default router;
