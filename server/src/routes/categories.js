import express from 'express';
import { queryAll } from '../db/database.js';

const router = express.Router();

// GET /api/categories
router.get('/', (req, res) => {
  try {
    const categories = queryAll(`
      SELECT c.*, COUNT(r.id) as recipe_count
      FROM categories c
      LEFT JOIN recipes r ON r.category_id = c.id AND r.status = 'published'
      GROUP BY c.id
      ORDER BY c.id ASC
    `);

    return res.json({ categories });
  } catch (err) {
    console.error('Fetch categories error:', err);
    return res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

export default router;
