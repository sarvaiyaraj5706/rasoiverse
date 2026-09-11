import express from 'express';
import { generateRecipe, parseNaturalLanguageIngredients, answerVoiceAssistantQuery } from '../services/aiService.js';
import { optionalAuth, authenticateToken } from '../middleware/auth.js';
import { queryAll, runCommand } from '../db/database.js';

const router = express.Router();

// POST /api/ai/generate
router.post('/generate', optionalAuth, async (req, res) => {
  try {
    const { ingredients, cuisine, mealType, dietaryPreference, cookingTime, difficulty } = req.body;

    const recipe = await generateRecipe({
      ingredients,
      cuisine,
      mealType,
      dietaryPreference,
      cookingTime,
      difficulty
    });

    // Save to user history if logged in
    if (req.user && req.user.id) {
      try {
        runCommand(
          `INSERT INTO ai_generated_recipes (user_id, prompt, title, recipe_data) 
           VALUES (?, ?, ?, ?)`,
          [
            req.user.id,
            JSON.stringify({ ingredients, cuisine, mealType, dietaryPreference, cookingTime, difficulty }),
            recipe.name,
            JSON.stringify(recipe)
          ]
        );
      } catch (e) {
        console.error('Failed to log AI recipe:', e);
      }
    }

    return res.json({ recipe });
  } catch (err) {
    console.error('AI Generation error:', err);
    return res.status(500).json({ error: 'Failed to generate recipe. Please try again.' });
  }
});

// POST /api/ai/parse-ingredients
router.post('/parse-ingredients', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.json({ ingredients: [] });

    const ingredients = await parseNaturalLanguageIngredients(text);
    return res.json({ ingredients });
  } catch (err) {
    console.error('Parse ingredients error:', err);
    return res.status(500).json({ error: 'Failed to parse natural language ingredients' });
  }
});

// POST /api/ai/assistant
router.post('/assistant', async (req, res) => {
  try {
    const { recipeTitle, currentStepNumber, currentStepInstruction, command, language } = req.body;

    const response = await answerVoiceAssistantQuery({
      recipeTitle,
      currentStepNumber,
      currentStepInstruction,
      command,
      language: language || 'en'
    });

    return res.json(response);
  } catch (err) {
    console.error('AI voice assistant error:', err);
    return res.status(500).json({
      action: 'SPEAK',
      reply: 'Sorry, I had trouble processing that. You can say "Next step" or "Start timer".'
    });
  }
});

// GET /api/ai/my-history
router.get('/my-history', authenticateToken, (req, res) => {
  try {
    const history = queryAll(
      `SELECT id, title, prompt, recipe_data, created_at 
       FROM ai_generated_recipes 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 20`,
      [req.user.id]
    ).map(row => ({
      id: row.id,
      title: row.title,
      prompt: JSON.parse(row.prompt || '{}'),
      recipe: JSON.parse(row.recipe_data),
      created_at: row.created_at
    }));

    return res.json({ history });
  } catch (err) {
    console.error('Fetch AI history error:', err);
    return res.status(500).json({ error: 'Failed to fetch AI recipe history' });
  }
});

export default router;
