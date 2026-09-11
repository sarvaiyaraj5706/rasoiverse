import express from 'express';
import bcrypt from 'bcryptjs';
import { queryOne, runCommand } from '../db/database.js';
import { authenticateToken, generateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, preferredLanguage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check existing
    const existing = queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = runCommand(
      `INSERT INTO users (name, email, password_hash, role, preferred_language, status) 
       VALUES (?, ?, ?, 'user', ?, 'active')`,
      [name.trim(), email.toLowerCase().trim(), passwordHash, preferredLanguage || 'en']
    );

    const user = {
      id: result.lastInsertRowid,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: 'user',
      preferred_language: preferredLanguage || 'en'
    };

    const token = generateToken(user);

    return res.status(201).json({
      message: 'Account created successfully',
      user,
      token
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = queryOne('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.status === 'deactivated') {
      return res.status(403).json({ error: 'Your account is deactivated. Please contact administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferred_language: user.preferred_language
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  return res.json({ user: req.user });
});

// PUT /api/auth/profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { name, preferred_language } = req.body;
    const userId = req.user.id;

    if (name) {
      runCommand('UPDATE users SET name = ? WHERE id = ?', [name.trim(), userId]);
    }
    if (preferred_language) {
      runCommand('UPDATE users SET preferred_language = ? WHERE id = ?', [preferred_language, userId]);
    }

    const updatedUser = queryOne('SELECT id, name, email, role, preferred_language FROM users WHERE id = ?', [userId]);
    return res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Profile update error:', err);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  // Demo password reset acknowledgement
  return res.json({
    message: `If an account exists for ${email}, a password reset link has been dispatched to your email.`
  });
});

export default router;
