import express from 'express';
import { queryAll, queryOne, runCommand } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All favorite routes require authentication
router.use(authenticateToken);

// GET /api/favorites - strictly returns only logged-in user's favorites
router.get('/', (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = queryAll(
      `SELECT r.id, r.name, r.slug, r.description, r.image, r.cuisine, r.region,
              r.dietary_tags, r.servings, r.prep_time, r.cook_time, r.difficulty,
              r.rating, r.calories, f.created_at as favorited_at
       FROM favorites f
       JOIN recipes r ON f.recipe_id = r.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    ).map(r => ({
      ...r,
      dietary_tags: typeof r.dietary_tags === 'string' ? JSON.parse(r.dietary_tags) : r.dietary_tags,
      isFavorited: true
    }));

    return res.json({ favorites });
  } catch (err) {
    console.error('Fetch favorites error:', err);
    return res.status(500).json({ error: 'Failed to retrieve favorites' });
  }
});

// POST /api/favorites/:recipeId
router.post('/:recipeId', (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = parseInt(req.params.recipeId, 10);

    const recipe = queryOne('SELECT id FROM recipes WHERE id = ?', [recipeId]);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    runCommand(
      'INSERT OR IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)',
      [userId, recipeId]
    );

    return res.json({ message: 'Recipe saved to favorites', isFavorited: true });
  } catch (err) {
    console.error('Add favorite error:', err);
    return res.status(500).json({ error: 'Failed to favorite recipe' });
  }
});

// DELETE /api/favorites/:recipeId
router.delete('/:recipeId', (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = parseInt(req.params.recipeId, 10);

    runCommand('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?', [userId, recipeId]);

    return res.json({ message: 'Recipe removed from favorites', isFavorited: false });
  } catch (err) {
    console.error('Delete favorite error:', err);
    return res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

export default router;
