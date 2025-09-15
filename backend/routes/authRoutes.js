import { Router } from 'express';
import { manualLogin, googleLogin} from '../controllers/authController.js';

const router = Router();

// Manual login (credentials login)
router.post('/login', manualLogin);

// Google OAuth login
router.post('/google', googleLogin);



export default router;
