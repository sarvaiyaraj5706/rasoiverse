import { seedFullMenu } from './seedFullMenu.js';
import { queryOne, queryAll, runCommand } from './database.js';

export async function seedDatabase() {
  await seedFullMenu();

  const chefUser = queryOne('SELECT id FROM users WHERE email = ?', ['chef@rasoiverse.com']);
  const chefUserId = chefUser?.id;

  // Seed sample favorites and recently viewed for demo chef user
  if (chefUserId) {
    const sampleRecipes = queryAll('SELECT id FROM recipes LIMIT 6');
    for (const item of sampleRecipes.slice(0, 3)) {
      try {
        runCommand('INSERT OR IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)', [chefUserId, item.id]);
      } catch (e) {}
    }
    for (const item of sampleRecipes.slice(3, 6)) {
      try {
        runCommand('INSERT OR IGNORE INTO recently_viewed (user_id, recipe_id) VALUES (?, ?)', [chefUserId, item.id]);
      } catch (e) {}
    }
  }

  // Seed initial search analytics
  const popularQueries = [
    { query: 'Farali Aloo Paratha', count: 48 },
    { query: 'Paneer Butter Masala', count: 92 },
    { query: 'Dhokla', count: 64 },
    { query: 'Biryani', count: 110 },
    { query: 'Potato', count: 35 },
    { query: 'Vada Pav', count: 75 },
    { query: 'Sabudana Khichdi', count: 82 }
  ];
  for (const q of popularQueries) {
    runCommand('INSERT OR REPLACE INTO search_analytics (query, count) VALUES (?, ?)', [q.query, q.count]);
  }

  console.log('🎉 Seed completed successfully!');
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => {
      console.log('Database seeded and ready!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error seeding database:', err);
      process.exit(1);
    });
}
