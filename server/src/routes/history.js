import express from 'express';
import { queryAll, runCommand } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// GET /api/history - strictly returns only logged-in user's recently viewed
router.get('/', (req, res) => {
  try {
    const userId = req.user.id;
    const history = queryAll(
      `SELECT r.id, r.name, r.slug, r.description, r.image, r.cuisine, r.region,
              r.dietary_tags, r.servings, r.prep_time, r.cook_time, r.difficulty,
              r.rating, r.calories, rv.viewed_at
       FROM recently_viewed rv
       JOIN recipes r ON rv.recipe_id = r.id
       WHERE rv.user_id = ?
       ORDER BY rv.viewed_at DESC
       LIMIT 30`,
      [userId]
    ).map(r => ({
      ...r,
      dietary_tags: typeof r.dietary_tags === 'string' ? JSON.parse(r.dietary_tags) : r.dietary_tags
    }));

    return res.json({ history });
  } catch (err) {
    console.error('Fetch history error:', err);
    return res.status(500).json({ error: 'Failed to retrieve viewing history' });
  }
});

// DELETE /api/history - clear viewing history
router.delete('/', (req, res) => {
  try {
    runCommand('DELETE FROM recently_viewed WHERE user_id = ?', [req.user.id]);
    return res.json({ message: 'Viewing history cleared' });
  } catch (err) {
    console.error('Clear history error:', err);
    return res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default router;
