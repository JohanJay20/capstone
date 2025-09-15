import User from '../models/user.js';
import bcrypt from 'bcryptjs'; // Import bcryptjs


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id || req.user.id;  // If no ID in params, use the one from the token
  
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

export const deleteUser = async (req, res) => {
    try {
        const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
        if (!rowsDeleted) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const changePassword = async (req, res) => {
    const userId = req.user.id; // assuming authentication middleware sets req.user
    const { newPassword } = req.body;
  
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: hashedPassword }, { where: { id: userId } });
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

