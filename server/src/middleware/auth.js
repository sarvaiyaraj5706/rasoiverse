import jwt from 'jsonwebtoken';
import { queryOne } from '../db/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'rasoiverse_super_secret_jwt_key_2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Verify user still exists in database and is active
    const user = queryOne('SELECT id, name, email, role, preferred_language, status FROM users WHERE id = ?', [userPayload.id]);
    if (!user) {
      return res.status(401).json({ error: 'User account not found' });
    }

    if (user.status === 'deactivated') {
      return res.status(403).json({ error: 'Your account has been deactivated. Please contact support.' });
    }

    req.user = user;
    next();
  });
}

// Optional auth for endpoints where guest or logged in user can access
export function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (!err && userPayload) {
      const user = queryOne('SELECT id, name, email, role, preferred_language, status FROM users WHERE id = ?', [userPayload.id]);
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  });
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export default {
  authenticateToken,
  optionalAuth,
  generateToken
};
