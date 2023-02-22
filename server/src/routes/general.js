import { Router } from 'express';
import { getUser } from '../controllers/general.js';

const router = Router();

router.get('/users/:id', getUser);

export default router;