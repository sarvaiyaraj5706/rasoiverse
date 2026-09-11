import { queryAll } from '../db/database.js';

/**
 * Normalize an ingredient name to a base canonical form
 */
export function normalizeIngredient(name = '') {
  const str = name.toLowerCase().trim();
  if (str.includes('potato') || str.includes('aloo') || str.includes('batata')) return 'potato';
  if (str.includes('tomato') || str.includes('tamatar')) return 'tomato';
  if (str.includes('onion') || str.includes('pyaz')) return 'onion';
  if (str.includes('paneer') || str.includes('cottage cheese')) return 'paneer';
  if (str.includes('curd') || str.includes('yoghurt') || str.includes('dahi')) return 'curd';
  if (str.includes('rice') || str.includes('chawal')) return 'rice';
  if (str.includes('chickpea') || str.includes('chole') || str.includes('kabuli chana')) return 'chickpeas';
  if (str.includes('rajma') || str.includes('kidney bean')) return 'rajma';
  if (str.includes('sabudana') || str.includes('tapioca') || str.includes('sago')) return 'sabudana';
  if (str.includes('peanut') || str.includes('sing')) return 'peanut';
  if (str.includes('besan') || str.includes('gram flour')) return 'besan';
  if (str.includes('spinach') || str.includes('palak')) return 'spinach';
  if (str.includes('garlic') || str.includes('lasun')) return 'garlic';
  if (str.includes('ginger') || str.includes('adrak')) return 'ginger';
  if (str.includes('coriander') || str.includes('dhaniya')) return 'coriander';
  if (str.includes('lemon') || str.includes('nimbu')) return 'lemon';
  if (str.includes('chilli') || str.includes('mirchi')) return 'chilli';
  if (str.includes('semolina') || str.includes('rava') || str.includes('suji')) return 'semolina';
  if (str.includes('ghee') || str.includes('butter') || str.includes('makhan')) return 'butter';
  if (str.includes('milk') || str.includes('doodh')) return 'milk';
  if (str.includes('cashew') || str.includes('kaju')) return 'cashew';
  if (str.includes('fenugreek') || str.includes('methi')) return 'methi';
  if (str.includes('pav') || str.includes('bread')) return 'bread';
  return str.split(' ')[0]; // fallback to first token
}

/**
 * Match recipes based on user's available ingredients
 * Returns categorized recipes:
 * - exactMatches: User has all or almost all ingredients
 * - missingOneOrTwo: User has all except 1 or 2 ingredients (e.g. "You have 4/5 ingredients")
 * - similarRecipes: Recipes that share at least 2 common ingredients
 */
export function matchRecipesByIngredients(userIngredients = []) {
  if (!userIngredients || userIngredients.length === 0) return { exactMatches: [], missingOneOrTwo: [], similarRecipes: [] };

  const normalizedUserList = userIngredients.map(normalizeIngredient);

  // Fetch all recipes with their ingredients
  const recipes = queryAll(`
    SELECT r.id, r.name, r.slug, r.description, r.image, r.cuisine, r.region, 
           r.dietary_tags, r.servings, r.prep_time, r.cook_time, r.difficulty, r.rating, r.calories
    FROM recipes r
    WHERE r.status = 'published'
  `);

  const results = [];

  for (const recipe of recipes) {
    const ingRows = queryAll('SELECT name FROM recipe_ingredients WHERE recipe_id = ?', [recipe.id]);
    const totalIngredients = ingRows.length;
    if (totalIngredients === 0) continue;

    let matchedCount = 0;
    const matchedNames = [];
    const missingIngredients = [];

    for (const ing of ingRows) {
      const normIng = normalizeIngredient(ing.name);
      // Check if user has this ingredient
      const isMatched = normalizedUserList.some(userNorm => 
        normIng.includes(userNorm) || userNorm.includes(normIng) || ing.name.toLowerCase().includes(userNorm)
      );

      if (isMatched) {
        matchedCount++;
        matchedNames.push(ing.name);
      } else {
        // Exclude common basic salt/water/spices from penalizing the count
        const lower = ing.name.toLowerCase();
        const isBasicStaple = lower.includes('salt') || lower.includes('water') || lower.includes('oil') || lower.includes('turmeric') || lower.includes('chilli powder');
        if (!isBasicStaple) {
          missingIngredients.push(ing.name);
        }
      }
    }

    // Only consider recipes where at least 1 ingredient matches
    if (matchedCount > 0) {
      const matchScore = (matchedCount / totalIngredients) * 100;
      results.push({
        ...recipe,
        dietary_tags: typeof recipe.dietary_tags === 'string' ? JSON.parse(recipe.dietary_tags) : recipe.dietary_tags,
        matchedCount,
        totalIngredients,
        missingCount: missingIngredients.length,
        missingIngredients: missingIngredients.slice(0, 3), // top missing ingredients
        matchSummary: `You already have ${matchedCount}/${totalIngredients} ingredients`,
        matchScore
      });
    }
  }

  // Sort results by match count and score descending
  results.sort((a, b) => b.matchScore - a.matchScore || a.missingCount - b.missingCount);

  // Categorize
  const exactMatches = results.filter(r => r.missingCount <= 1);
  const missingOneOrTwo = results.filter(r => r.missingCount > 1 && r.missingCount <= 3);
  const similarRecipes = results.filter(r => r.missingCount > 3);

  return {
    exactMatches,
    missingOneOrTwo,
    similarRecipes,
    totalFound: results.length
  };
}

export default {
  normalizeIngredient,
  matchRecipesByIngredients
};
