import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;
