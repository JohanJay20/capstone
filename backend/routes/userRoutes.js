import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  changePassword
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/me', authenticateToken, getUserById); 
router.get('/:id', getUserById);  // To get any user by ID
 // To get the current authenticated user


router.delete('/:id', deleteUser);
router.put('/change-password', authenticateToken, changePassword);
export default router;
