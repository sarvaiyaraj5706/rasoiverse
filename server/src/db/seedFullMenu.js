import bcrypt from 'bcryptjs';
import { db, initSchema, queryAll, queryOne, runCommand } from './database.js';
import { categoriesData } from './seedData.js';
import { enrichedExistingData } from './enrichedExistingData.js';
import { menuRecipesData } from './menuRecipesData.js';

export async function seedFullMenu() {
  console.log('=====================================================');
  console.log('🍽️  RASOIVERSE MASTER SEED: 141 RECIPES & FULL MENU');
  console.log('=====================================================');

  console.log('🔄 1. Initializing schema & migrations...');
  initSchema();

  console.log('🔄 2. Ensuring demo users exist...');
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('Admin@123', salt);
  const userPasswordHash = await bcrypt.hash('Chef@123', salt);

  const existingAdmin = queryOne('SELECT id FROM users WHERE email = ?', ['admin@rasoiverse.com']);
  if (!existingAdmin) {
    runCommand(
      `INSERT INTO users (name, email, password_hash, role, preferred_language, status) 
       VALUES (?, ?, ?, 'admin', 'en', 'active')`,
      ['Rasoi Administrator', 'admin@rasoiverse.com', adminPasswordHash]
    );
    console.log('  ✅ Admin user: admin@rasoiverse.com / Admin@123');
  }

  const existingChef = queryOne('SELECT id FROM users WHERE email = ?', ['chef@rasoiverse.com']);
  let chefUserId = existingChef?.id;
  if (!existingChef) {
    const result = runCommand(
      `INSERT INTO users (name, email, password_hash, role, preferred_language, status) 
       VALUES (?, ?, ?, 'user', 'hi', 'active')`,
      ['Chef Aarav Sharma', 'chef@rasoiverse.com', userPasswordHash]
    );
    chefUserId = result.lastInsertRowid;
    console.log('  ✅ Demo user: chef@rasoiverse.com / Chef@123');
  }

  console.log('🔄 3. Seeding categories (standard + banquet reference)...');
  const allCategories = [
    ...categoriesData,
    {
      name: "Starters & Kebabs",
      slug: "starters",
      description: "Sizzling tandoori tikkas, crisp kebabs, grilled delicacies, and banquet party starters.",
      image: "/images/recipes/indian-grill-veg.jpg"
    },
    {
      name: "Live Counter & Chaats",
      slug: "live-counter",
      description: "Interactive live station favourites: artisan pizzas, tossed pastas, and tangy street chaats.",
      image: "/images/recipes/palak-chaat.jpg"
    },
    {
      name: "Soups & Shorba",
      slug: "soups",
      description: "Velvety aromatic soups, comforting broths, and soul-warming hot appetizers.",
      image: "/images/recipes/cream-of-broccoli.jpg"
    },
    {
      name: "Royal Main Courses",
      slug: "mains",
      description: "Authentic dum biryanis, aromatic curries, coastal seafood, and rich heritage banquet gravies.",
      image: "/images/recipes/chicken-dum-biryani.jpg"
    },
    {
      name: "Salads & Accompaniments",
      slug: "salads-accompaniments",
      description: "Crisp salads, artisan dressings, heritage raitas, crunchy papads, and zesty condiments.",
      image: "/images/recipes/russian-salad.jpg"
    }
  ];

  const categoryMap = {};
  for (const cat of allCategories) {
    let existingCat = queryOne('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
    if (!existingCat) {
      const res = runCommand(
        'INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)',
        [cat.name, cat.slug, cat.description, cat.image]
      );
      categoryMap[cat.slug] = res.lastInsertRowid;
    } else {
      categoryMap[cat.slug] = existingCat.id;
    }
  }
  console.log(`  ✅ ${Object.keys(categoryMap).length} categories ready`);

  console.log('🔄 4. Seeding & enriching all 141 recipes...');
  const combinedRecipes = [...enrichedExistingData, ...menuRecipesData];
  console.log(`  Total recipes to process: ${combinedRecipes.length} (70 original enriched + 71 banquet menu)`);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const r of combinedRecipes) {
    const categoryId = categoryMap[r.categorySlug] || categoryMap['mains'] || 1;
    const dietaryTagsJson = JSON.stringify(r.dietary_tags || []);
    const totalTime = r.total_time || ((r.prep_time || 15) + (r.cook_time || 20));

    let existingRecipe = queryOne('SELECT id FROM recipes WHERE slug = ?', [r.slug]);
    let recipeId;

    if (!existingRecipe) {
      const res = runCommand(
        `INSERT INTO recipes 
         (name, name_hi, name_gu, slug, description, description_hi, description_gu, image, cuisine, region, 
          category_id, dietary_tags, servings, prep_time, cook_time, total_time, difficulty, rating, status, 
          calories, protein, carbs, fat, fasting_info, views_count, prep_instructions_en, prep_instructions_hi, 
          prep_instructions_gu, tips_en, tips_hi, tips_gu, common_mistakes_en, common_mistakes_hi, common_mistakes_gu, 
          serving_suggestions_en, serving_suggestions_hi, serving_suggestions_gu, storage_en, storage_hi, storage_gu) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          r.name,
          r.name_hi || r.name,
          r.name_gu || r.name,
          r.slug,
          r.description,
          r.description_hi || r.description,
          r.description_gu || r.description,
          r.image,
          r.cuisine,
          r.region,
          categoryId,
          dietaryTagsJson,
          r.servings || 4,
          r.prep_time || 15,
          r.cook_time || 20,
          totalTime,
          r.difficulty || 'Medium',
          r.rating || 4.8,
          r.calories || 250,
          r.protein || 8,
          r.carbs || 30,
          r.fat || 8,
          r.fasting_info || null,
          Math.floor(Math.random() * 400) + 60,
          r.prep_instructions_en || null,
          r.prep_instructions_hi || null,
          r.prep_instructions_gu || null,
          r.tips_en || null,
          r.tips_hi || null,
          r.tips_gu || null,
          r.common_mistakes_en || null,
          r.common_mistakes_hi || null,
          r.common_mistakes_gu || null,
          r.serving_suggestions_en || null,
          r.serving_suggestions_hi || null,
          r.serving_suggestions_gu || null,
          r.storage_en || null,
          r.storage_hi || null,
          r.storage_gu || null
        ]
      );
      recipeId = res.lastInsertRowid;
      insertedCount++;
    } else {
      recipeId = existingRecipe.id;
      runCommand(
        `UPDATE recipes SET
          name = ?, name_hi = ?, name_gu = ?, description = ?, description_hi = ?, description_gu = ?,
          image = ?, cuisine = ?, region = ?, category_id = ?, dietary_tags = ?, servings = ?,
          prep_time = ?, cook_time = ?, total_time = ?, difficulty = ?, rating = ?, calories = ?,
          protein = ?, carbs = ?, fat = ?, fasting_info = ?, prep_instructions_en = ?, prep_instructions_hi = ?,
          prep_instructions_gu = ?, tips_en = ?, tips_hi = ?, tips_gu = ?, common_mistakes_en = ?,
          common_mistakes_hi = ?, common_mistakes_gu = ?, serving_suggestions_en = ?, serving_suggestions_hi = ?,
          serving_suggestions_gu = ?, storage_en = ?, storage_hi = ?, storage_gu = ?
         WHERE id = ?`,
        [
          r.name,
          r.name_hi || r.name,
          r.name_gu || r.name,
          r.description,
          r.description_hi || r.description,
          r.description_gu || r.description,
          r.image,
          r.cuisine,
          r.region,
          categoryId,
          dietaryTagsJson,
          r.servings || 4,
          r.prep_time || 15,
          r.cook_time || 20,
          totalTime,
          r.difficulty || 'Medium',
          r.rating || 4.8,
          r.calories || 250,
          r.protein || 8,
          r.carbs || 30,
          r.fat || 8,
          r.fasting_info || null,
          r.prep_instructions_en || null,
          r.prep_instructions_hi || null,
          r.prep_instructions_gu || null,
          r.tips_en || null,
          r.tips_hi || null,
          r.tips_gu || null,
          r.common_mistakes_en || null,
          r.common_mistakes_hi || null,
          r.common_mistakes_gu || null,
          r.serving_suggestions_en || null,
          r.serving_suggestions_hi || null,
          r.serving_suggestions_gu || null,
          r.storage_en || null,
          r.storage_hi || null,
          r.storage_gu || null,
          recipeId
        ]
      );
      updatedCount++;
    }

    // Refresh ingredients
    runCommand('DELETE FROM recipe_ingredients WHERE recipe_id = ?', [recipeId]);
    for (const ing of (r.ingredients || [])) {
      runCommand(
        `INSERT INTO recipe_ingredients (recipe_id, name, name_hi, name_gu, quantity, numeric_quantity, unit) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          recipeId,
          ing.name,
          ing.name_hi || ing.name,
          ing.name_gu || ing.name,
          String(ing.quantity || '1'),
          Number(ing.numeric_quantity || 1),
          ing.unit || ''
        ]
      );
    }

    // Refresh steps
    runCommand('DELETE FROM recipe_steps WHERE recipe_id = ?', [recipeId]);
    for (const step of (r.steps || [])) {
      runCommand(
        `INSERT INTO recipe_steps 
         (recipe_id, step_number, title, title_hi, title_gu, instruction, instruction_hi, instruction_gu, 
          image, timer_seconds, tip, tip_hi, tip_gu, heat_level) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          recipeId,
          step.step_number,
          step.title,
          step.title_hi || step.title,
          step.title_gu || step.title,
          step.instruction,
          step.instruction_hi || step.instruction,
          step.instruction_gu || step.instruction,
          step.image || r.image,
          step.timer_seconds || 0,
          step.tip || null,
          step.tip_hi || null,
          step.tip_gu || null,
          step.heat_level || 'Medium'
        ]
      );
    }
  }

  // Analytics & verification
  const totalRecipes = queryOne('SELECT count(*) as count FROM recipes').count;
  const totalIngredients = queryOne('SELECT count(*) as count FROM recipe_ingredients').count;
  const totalSteps = queryOne('SELECT count(*) as count FROM recipe_steps').count;

  console.log('-----------------------------------------------------');
  console.log(`🎉 Master Seed Completed!`);
  console.log(`  ➕ Inserted: ${insertedCount} new recipes`);
  console.log(`  🔄 Updated:  ${updatedCount} existing recipes`);
  console.log(`  📖 Total Recipes:     ${totalRecipes}`);
  console.log(`  🥕 Total Ingredients: ${totalIngredients}`);
  console.log(`  ⏱️ Total Steps:       ${totalSteps}`);
  console.log('-----------------------------------------------------');
}

// If executed directly
if (process.argv[1] && process.argv[1].endsWith('seedFullMenu.js')) {
  seedFullMenu()
    .then(() => {
      console.log('✅ Database seeded and ready!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Error seeding database:', err);
      process.exit(1);
    });
}
