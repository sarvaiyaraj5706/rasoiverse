import express from 'express';
import { queryAll, queryOne, runCommand } from '../db/database.js';
import { optionalAuth } from '../middleware/auth.js';
import { matchRecipesByIngredients } from '../services/ingredientMatcher.js';

const router = express.Router();

// GET /api/recipes/suggestions?q=paneer
router.get('/suggestions', (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) return res.json({ suggestions: [] });

  const rows = queryAll(
    `SELECT name, name_hi, name_gu FROM recipes 
     WHERE status = 'published' AND (name LIKE ? OR name_hi LIKE ? OR name_gu LIKE ?) 
     LIMIT 6`,
    [`%${query}%`, `%${query}%`, `%${query}%`]
  );

  return res.json({ suggestions: rows.map(r => r.name) });
});

// GET /api/recipes/search-ingredients
router.get('/search-ingredients', (req, res) => {
  try {
    const rawIngredients = req.query.ingredients || '';
    const list = rawIngredients
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    if (list.length === 0) {
      return res.json({ exactMatches: [], missingOneOrTwo: [], similarRecipes: [], totalFound: 0 });
    }

    const results = matchRecipesByIngredients(list);
    return res.json(results);
  } catch (err) {
    console.error('Search ingredients error:', err);
    return res.status(500).json({ error: 'Failed to search recipes by ingredients' });
  }
});

// GET /api/recipes
router.get('/', (req, res) => {
  try {
    const {
      search,
      cuisine,
      category,
      dietary,
      difficulty,
      maxTime,
      sort,
      page = 1,
      limit = 20
    } = req.query;

    let sql = `
      SELECT r.id, r.name, r.name_hi, r.name_gu, r.slug, r.description, r.description_hi, r.description_gu,
             r.image, r.cuisine, r.region, r.category_id, c.name as category_name, c.slug as category_slug,
             r.dietary_tags, r.servings, r.prep_time, r.cook_time, r.total_time, r.difficulty,
             r.rating, r.calories, r.protein, r.carbs, r.fat, r.fasting_info, r.views_count
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      WHERE r.status = 'published'
    `;
    const params = [];

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      sql += ` AND (r.name LIKE ? OR r.name_hi LIKE ? OR r.name_gu LIKE ? OR r.description LIKE ? OR r.description_hi LIKE ? OR r.description_gu LIKE ? OR r.cuisine LIKE ? OR r.region LIKE ?)`;
      params.push(q, q, q, q, q, q, q, q);

      // Track analytics
      try {
        const existing = queryOne('SELECT count FROM search_analytics WHERE query = ?', [search.trim()]);
        if (existing) {
          runCommand('UPDATE search_analytics SET count = count + 1, updated_at = CURRENT_TIMESTAMP WHERE query = ?', [search.trim()]);
        } else {
          runCommand('INSERT INTO search_analytics (query, count) VALUES (?, 1)', [search.trim()]);
        }
      } catch (e) {}
    }

    if (cuisine) {
      sql += ` AND LOWER(r.cuisine) = LOWER(?)`;
      params.push(cuisine);
    }

    if (category) {
      sql += ` AND (LOWER(c.slug) = LOWER(?) OR LOWER(c.name) = LOWER(?))`;
      params.push(category, category);
    }

    if (dietary) {
      sql += ` AND r.dietary_tags LIKE ?`;
      params.push(`%${dietary}%`);
    }

    if (difficulty) {
      sql += ` AND LOWER(r.difficulty) = LOWER(?)`;
      params.push(difficulty);
    }

    if (maxTime) {
      const timeNum = parseInt(maxTime, 10);
      if (!isNaN(timeNum)) {
        sql += ` AND (r.prep_time + r.cook_time) <= ?`;
        params.push(timeNum);
      }
    }

    // Sorting
    if (sort === 'rating') {
      sql += ` ORDER BY r.rating DESC`;
    } else if (sort === 'quickest') {
      sql += ` ORDER BY (r.prep_time + r.cook_time) ASC`;
    } else if (sort === 'popular') {
      sql += ` ORDER BY r.views_count DESC`;
    } else if (sort === 'name') {
      sql += ` ORDER BY r.name ASC`;
    } else {
      sql += ` ORDER BY r.id ASC`;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    // Get total count
    const countSql = sql.replace(/SELECT r\.id[\s\S]*?FROM recipes r/, 'SELECT COUNT(*) as total FROM recipes r');
    const totalRow = queryOne(countSql, params);
    const total = totalRow ? totalRow.total : 0;

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);

    const recipes = queryAll(sql, params).map(r => ({
      ...r,
      dietary_tags: typeof r.dietary_tags === 'string' ? JSON.parse(r.dietary_tags) : r.dietary_tags
    }));

    return res.json({
      recipes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    console.error('List recipes error:', err);
    return res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
});

// GET /api/recipes/recommended/:id
router.get('/recommended/:id', (req, res) => {
  try {
    const current = queryOne('SELECT id, cuisine, category_id FROM recipes WHERE id = ? OR slug = ?', [req.params.id, req.params.id]);
    if (!current) {
      return res.json({ recommended: [] });
    }

    const recommended = queryAll(
      `SELECT r.id, r.name, r.name_hi, r.name_gu, r.slug, r.description, r.description_hi, r.description_gu,
              r.image, r.cuisine, r.region, r.dietary_tags, r.prep_time, r.cook_time, r.total_time, r.difficulty, r.rating, r.calories
       FROM recipes r
       WHERE r.status = 'published' AND r.id != ? AND (r.cuisine = ? OR r.category_id = ?)
       ORDER BY r.rating DESC
       LIMIT 4`,
      [current.id, current.cuisine, current.category_id]
    ).map(r => ({
      ...r,
      dietary_tags: typeof r.dietary_tags === 'string' ? JSON.parse(r.dietary_tags) : r.dietary_tags
    }));

    return res.json({ recommended });
  } catch (err) {
    console.error('Recommendations error:', err);
    return res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// GET /api/recipes/:slugOrId
router.get('/:slugOrId', optionalAuth, (req, res) => {
  try {
    const { slugOrId } = req.params;
    let recipe;
    if (/^\d+$/.test(slugOrId)) {
      recipe = queryOne(
        `SELECT r.*, c.name as category_name, c.slug as category_slug 
         FROM recipes r 
         LEFT JOIN categories c ON r.category_id = c.id 
         WHERE r.id = ?`,
        [parseInt(slugOrId, 10)]
      );
    } else {
      recipe = queryOne(
        `SELECT r.*, c.name as category_name, c.slug as category_slug 
         FROM recipes r 
         LEFT JOIN categories c ON r.category_id = c.id 
         WHERE r.slug = ?`,
        [slugOrId]
      );
    }

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Increment view count
    runCommand('UPDATE recipes SET views_count = views_count + 1 WHERE id = ?', [recipe.id]);

    // Record view in recently_viewed if user is authenticated
    if (req.user && req.user.id) {
      try {
        runCommand(
          `INSERT INTO recently_viewed (user_id, recipe_id, viewed_at) 
           VALUES (?, ?, CURRENT_TIMESTAMP)
           ON CONFLICT(user_id, recipe_id) DO UPDATE SET viewed_at = CURRENT_TIMESTAMP`,
          [req.user.id, recipe.id]
        );
      } catch (e) {}
    }

    // Fetch ingredients
    const ingredients = queryAll(
      'SELECT id, name, name_hi, name_gu, quantity, numeric_quantity, unit FROM recipe_ingredients WHERE recipe_id = ? ORDER BY id ASC',
      [recipe.id]
    );

    // Fetch steps
    const steps = queryAll(
      `SELECT id, step_number, title, title_hi, title_gu, instruction, instruction_hi, instruction_gu, 
              image, timer_seconds, tip, tip_hi, tip_gu, heat_level 
       FROM recipe_steps 
       WHERE recipe_id = ? 
       ORDER BY step_number ASC`,
      [recipe.id]
    );

    // Check if user has favorited
    let isFavorited = false;
    if (req.user && req.user.id) {
      const fav = queryOne('SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?', [req.user.id, recipe.id]);
      isFavorited = !!fav;
    }

    return res.json({
      recipe: {
        ...recipe,
        dietary_tags: typeof recipe.dietary_tags === 'string' ? JSON.parse(recipe.dietary_tags) : recipe.dietary_tags,
        ingredients,
        steps,
        isFavorited
      }
    });
  } catch (err) {
    console.error('Fetch recipe detail error:', err);
    return res.status(500).json({ error: 'Failed to retrieve recipe details' });
  }
});

export default router;
