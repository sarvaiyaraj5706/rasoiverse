import express from 'express';
import { queryAll, queryOne, runCommand } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

// Strict security: require both valid token and admin role for all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// ==========================================
// 1. DASHBOARD ANALYTICS
// ==========================================
// GET /api/admin/analytics
router.get('/analytics', (req, res) => {
  try {
    const totalRecipes = queryOne('SELECT COUNT(*) as count FROM recipes').count;
    const totalUsers = queryOne('SELECT COUNT(*) as count FROM users').count;
    const totalAiGenerations = queryOne('SELECT COUNT(*) as count FROM ai_generated_recipes').count;
    const totalFavorites = queryOne('SELECT COUNT(*) as count FROM favorites').count;

    const mostViewedRecipes = queryAll(
      `SELECT id, name, slug, image, cuisine, views_count, rating 
       FROM recipes 
       ORDER BY views_count DESC 
       LIMIT 5`
    );

    const popularCategories = queryAll(
      `SELECT c.name, COUNT(r.id) as count 
       FROM categories c 
       JOIN recipes r ON r.category_id = c.id 
       GROUP BY c.id 
       ORDER BY count DESC`
    );

    const popularSearches = queryAll(
      `SELECT query, count 
       FROM search_analytics 
       ORDER BY count DESC 
       LIMIT 8`
    );

    const recentUsers = queryAll(
      `SELECT id, name, email, role, status, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 5`
    );

    return res.json({
      metrics: {
        totalRecipes,
        totalUsers,
        totalAiGenerations,
        totalFavorites
      },
      mostViewedRecipes,
      popularCategories,
      popularSearches,
      recentUsers
    });
  } catch (err) {
    console.error('Admin analytics error:', err);
    return res.status(500).json({ error: 'Failed to generate analytics' });
  }
});

// ==========================================
// 2. RECIPE MANAGEMENT (CRUD)
// ==========================================
// GET /api/admin/recipes
router.get('/recipes', (req, res) => {
  try {
    const { search, category, status } = req.query;
    let sql = `
      SELECT r.*, c.name as category_name 
      FROM recipes r 
      LEFT JOIN categories c ON r.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (r.name LIKE ? OR r.cuisine LIKE ? OR r.region LIKE ?)`;
      const q = `%${search.trim()}%`;
      params.push(q, q, q);
    }
    if (category) {
      sql += ` AND r.category_id = ?`;
      params.push(category);
    }
    if (status) {
      sql += ` AND r.status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY r.id DESC`;

    const recipes = queryAll(sql, params).map(r => ({
      ...r,
      dietary_tags: typeof r.dietary_tags === 'string' ? JSON.parse(r.dietary_tags) : r.dietary_tags
    }));

    return res.json({ recipes });
  } catch (err) {
    console.error('Admin list recipes error:', err);
    return res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
});

// POST /api/admin/recipes - Add Recipe
router.post('/recipes', (req, res) => {
  try {
    const {
      name,
      description,
      image,
      cuisine,
      region,
      category_id,
      dietary_tags = [],
      servings = 4,
      prep_time = 15,
      cook_time = 25,
      difficulty = 'Medium',
      status = 'published',
      calories,
      protein,
      carbs,
      fat,
      fasting_info,
      ingredients = [],
      steps = []
    } = req.body;

    if (!name || !cuisine) {
      return res.status(400).json({ error: 'Recipe name and cuisine are required' });
    }

    // Generate unique slug
    let baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (queryOne('SELECT id FROM recipes WHERE slug = ?', [slug])) {
      slug = `${baseSlug}-${counter++}`;
    }

    const defaultImg = image || '/images/recipes/paneer-butter-masala.jpg';

    const insertResult = runCommand(
      `INSERT INTO recipes 
       (name, slug, description, image, cuisine, region, category_id, dietary_tags, servings, prep_time, cook_time, difficulty, status, calories, protein, carbs, fat, fasting_info)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        slug,
        description || '',
        defaultImg,
        cuisine,
        region || 'India',
        category_id || 1,
        JSON.stringify(dietary_tags),
        servings,
        prep_time,
        cook_time,
        difficulty,
        status,
        calories || 250,
        protein || 6,
        carbs || 35,
        fat || 8,
        fasting_info || null
      ]
    );

    const recipeId = insertResult.lastInsertRowid;

    // Insert ingredients
    for (const ing of ingredients) {
      if (ing.name && ing.name.trim()) {
        runCommand(
          'INSERT INTO recipe_ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)',
          [recipeId, ing.name.trim(), ing.quantity || '', ing.unit || '']
        );
      }
    }

    // Insert steps
    steps.forEach((step, idx) => {
      if (step.instruction && step.instruction.trim()) {
        runCommand(
          `INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, image, timer_seconds, tip) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            recipeId,
            step.step_number || idx + 1,
            step.title || `Step ${idx + 1}`,
            step.instruction.trim(),
            step.image || defaultImg,
            step.timer_seconds || 0,
            step.tip || null
          ]
        );
      }
    });

    return res.status(201).json({ message: 'Recipe created successfully', recipeId, slug });
  } catch (err) {
    console.error('Admin create recipe error:', err);
    return res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT /api/admin/recipes/:id - Edit Recipe
router.put('/recipes/:id', (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10);
    const existing = queryOne('SELECT id FROM recipes WHERE id = ?', [recipeId]);
    if (!existing) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const {
      name,
      description,
      image,
      cuisine,
      region,
      category_id,
      dietary_tags = [],
      servings,
      prep_time,
      cook_time,
      difficulty,
      status,
      calories,
      protein,
      carbs,
      fat,
      fasting_info,
      ingredients,
      steps
    } = req.body;

    runCommand(
      `UPDATE recipes SET 
         name = ?, description = ?, image = ?, cuisine = ?, region = ?,
         category_id = ?, dietary_tags = ?, servings = ?, prep_time = ?,
         cook_time = ?, difficulty = ?, status = ?, calories = ?, protein = ?,
         carbs = ?, fat = ?, fasting_info = ?
       WHERE id = ?`,
      [
        name,
        description,
        image,
        cuisine,
        region,
        category_id,
        JSON.stringify(dietary_tags),
        servings,
        prep_time,
        cook_time,
        difficulty,
        status,
        calories,
        protein,
        carbs,
        fat,
        fasting_info,
        recipeId
      ]
    );

    // Update ingredients if provided
    if (Array.isArray(ingredients)) {
      runCommand('DELETE FROM recipe_ingredients WHERE recipe_id = ?', [recipeId]);
      for (const ing of ingredients) {
        if (ing.name && ing.name.trim()) {
          runCommand(
            'INSERT INTO recipe_ingredients (recipe_id, name, quantity, unit) VALUES (?, ?, ?, ?)',
            [recipeId, ing.name.trim(), ing.quantity || '', ing.unit || '']
          );
        }
      }
    }

    // Update steps if provided
    if (Array.isArray(steps)) {
      runCommand('DELETE FROM recipe_steps WHERE recipe_id = ?', [recipeId]);
      steps.forEach((step, idx) => {
        if (step.instruction && step.instruction.trim()) {
          runCommand(
            `INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, image, timer_seconds, tip) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              recipeId,
              step.step_number || idx + 1,
              step.title || `Step ${idx + 1}`,
              step.instruction.trim(),
              step.image || image,
              step.timer_seconds || 0,
              step.tip || null
            ]
          );
        }
      });
    }

    return res.json({ message: 'Recipe updated successfully' });
  } catch (err) {
    console.error('Admin edit recipe error:', err);
    return res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE /api/admin/recipes/:id - Delete Recipe
router.delete('/recipes/:id', (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10);
    const existing = queryOne('SELECT id, name FROM recipes WHERE id = ?', [recipeId]);
    if (!existing) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    runCommand('DELETE FROM recipes WHERE id = ?', [recipeId]);
    return res.json({ message: `Recipe "${existing.name}" deleted successfully` });
  } catch (err) {
    console.error('Admin delete recipe error:', err);
    return res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// PATCH /api/admin/recipes/:id/toggle-status
router.patch('/recipes/:id/toggle-status', (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = queryOne('SELECT id, status FROM recipes WHERE id = ?', [recipeId]);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    const newStatus = recipe.status === 'published' ? 'draft' : 'published';
    runCommand('UPDATE recipes SET status = ? WHERE id = ?', [newStatus, recipeId]);

    return res.json({ message: `Recipe status changed to ${newStatus}`, status: newStatus });
  } catch (err) {
    console.error('Toggle status error:', err);
    return res.status(500).json({ error: 'Failed to update status' });
  }
});

// ==========================================
// 3. USER MANAGEMENT
// ==========================================
// GET /api/admin/users
router.get('/users', (req, res) => {
  try {
    const users = queryAll(`
      SELECT u.id, u.name, u.email, u.role, u.preferred_language, u.status, u.created_at,
             COUNT(DISTINCT f.id) as favorites_count,
             COUNT(DISTINCT ai.id) as ai_generations_count
      FROM users u
      LEFT JOIN favorites f ON f.user_id = u.id
      LEFT JOIN ai_generated_recipes ai ON ai.user_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    return res.json({ users });
  } catch (err) {
    console.error('Admin list users error:', err);
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// PATCH /api/admin/users/:id/status - Toggle user active / deactivated
router.patch('/users/:id/status', (req, res) => {
  try {
    const targetUserId = parseInt(req.params.id, 10);
    const targetUser = queryOne('SELECT id, role, status FROM users WHERE id = ?', [targetUserId]);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (targetUser.role === 'admin' && targetUser.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot deactivate your own admin account' });
    }

    const nextStatus = targetUser.status === 'active' ? 'deactivated' : 'active';
    runCommand('UPDATE users SET status = ? WHERE id = ?', [nextStatus, targetUserId]);

    return res.json({ message: `User account is now ${nextStatus}`, status: nextStatus });
  } catch (err) {
    console.error('Admin toggle user status error:', err);
    return res.status(500).json({ error: 'Failed to toggle user status' });
  }
});

// ==========================================
// 4. CATEGORY MANAGEMENT
// ==========================================
// POST /api/admin/categories
router.post('/categories', (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const result = runCommand(
      'INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)',
      [name.trim(), slug, description || '', image || '']
    );

    return res.status(201).json({ message: 'Category created', id: result.lastInsertRowid, slug });
  } catch (err) {
    console.error('Admin add category error:', err);
    return res.status(500).json({ error: 'Failed to create category' });
  }
});

// DELETE /api/admin/categories/:id
router.delete('/categories/:id', (req, res) => {
  try {
    const catId = parseInt(req.params.id, 10);
    runCommand('DELETE FROM categories WHERE id = ?', [catId]);
    return res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Admin delete category error:', err);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
