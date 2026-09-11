import { db, runCommand, queryAll, queryOne } from './database.js';
import { categoriesData, recipesData } from './seedData.js';

export function updateRecipeImages() {
  console.log('🔄 Updating category images in SQLite database...');
  for (const cat of categoriesData) {
    runCommand('UPDATE categories SET image = ? WHERE slug = ?', [cat.image, cat.slug]);
  }
  console.log('  ✅ Categories updated.');

  console.log('🔄 Updating 70 recipe images in SQLite database...');
  let updatedRecipes = 0;
  for (const recipe of recipesData) {
    const result = runCommand('UPDATE recipes SET image = ? WHERE slug = ?', [recipe.image, recipe.slug]);
    if (result.changes > 0) {
      updatedRecipes++;
    }
  }
  console.log(`  ✅ ${updatedRecipes} recipes updated with authentic images.`);

  console.log('🔄 Synchronizing recipe steps imagery...');
  runCommand(`
    UPDATE recipe_steps 
    SET image = (SELECT image FROM recipes WHERE recipes.id = recipe_steps.recipe_id)
  `);
  console.log('  ✅ Recipe steps synchronized.');

  // Verification check
  const checkSample = queryAll(`
    SELECT name, slug, image FROM recipes 
    WHERE slug IN ('palak-paneer', 'mumbai-pav-bhaji', 'khaman-dhokla', 'hyderabadi-dum-veg-biryani', 'sabudana-khichdi')
  `);
  console.log('\n🔍 Verification of sample updated recipes:');
  console.table(checkSample);
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('updateImages.js')) {
  try {
    updateRecipeImages();
    console.log('\n🎉 Database image update completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating database images:', err);
    process.exit(1);
  }
}
