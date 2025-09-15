import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generatePassword from '../utils/generatePassword.js';
import sendEmail from '../utils/sendEmail.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to create JWT token
function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

// Manual login (for users with credentials)
export const manualLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = createToken(user);
  res.json({ token, user });
};

// Google login (OAuth2)
export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, given_name, family_name, name, email, picture } = payload;

    let user = await User.findOne({ where: { email } });

    // If user doesn't exist, create a new user with a generated password
    if (!user) {
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        googleId: sub,
        givenName: given_name,
        familyName: family_name,
        displayName: name,
        email,
        image: picture,
        password: hashedPassword,
      });

      // Send the user a generated password email
      await sendEmail(email, password);
    }

    const token = createToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Google authentication failed', error: err.message });
  }
};


