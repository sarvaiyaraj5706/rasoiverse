import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../rasoiverse.db');

export const db = new DatabaseSync(dbPath);

// Enable WAL and Foreign Keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize schema
export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user', -- 'admin' or 'user'
      preferred_language TEXT NOT NULL DEFAULT 'en', -- 'en', 'hi', 'gu'
      status TEXT NOT NULL DEFAULT 'active', -- 'active', 'deactivated'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_hi TEXT,
      name_gu TEXT,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      description_hi TEXT,
      description_gu TEXT,
      image TEXT,
      cuisine TEXT NOT NULL,
      region TEXT,
      category_id INTEGER,
      dietary_tags TEXT, -- JSON array string e.g. ["Vegetarian", "Jain", "Farali"]
      servings INTEGER DEFAULT 4,
      prep_time INTEGER DEFAULT 15, -- minutes
      cook_time INTEGER DEFAULT 30, -- minutes
      total_time INTEGER DEFAULT 45, -- minutes
      difficulty TEXT DEFAULT 'Medium', -- 'Easy', 'Medium', 'Hard'
      rating REAL DEFAULT 4.8,
      status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft'
      calories INTEGER,
      protein REAL,
      carbs REAL,
      fat REAL,
      fasting_info TEXT,
      prep_instructions_en TEXT,
      prep_instructions_hi TEXT,
      prep_instructions_gu TEXT,
      tips_en TEXT,
      tips_hi TEXT,
      tips_gu TEXT,
      common_mistakes_en TEXT,
      common_mistakes_hi TEXT,
      common_mistakes_gu TEXT,
      serving_suggestions_en TEXT,
      serving_suggestions_hi TEXT,
      serving_suggestions_gu TEXT,
      storage_en TEXT,
      storage_hi TEXT,
      storage_gu TEXT,
      views_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS recipe_ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      name_hi TEXT,
      name_gu TEXT,
      quantity TEXT,
      numeric_quantity REAL,
      unit TEXT,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recipe_steps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      step_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      title_hi TEXT,
      title_gu TEXT,
      instruction TEXT NOT NULL,
      instruction_hi TEXT,
      instruction_gu TEXT,
      image TEXT,
      timer_seconds INTEGER DEFAULT 0,
      heat_level TEXT DEFAULT 'Medium',
      tip TEXT,
      tip_hi TEXT,
      tip_gu TEXT,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipe_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, recipe_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recently_viewed (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipe_id INTEGER NOT NULL,
      viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, recipe_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ai_generated_recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      prompt TEXT,
      title TEXT NOT NULL,
      recipe_data TEXT NOT NULL, -- JSON string
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS search_analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL UNIQUE,
      count INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ensure new columns exist on existing databases
  migrateSchema();
}

function migrateSchema() {
  function getExistingCols(table) {
    try {
      const rows = db.prepare(`PRAGMA table_info(${table})`).all();
      return new Set(rows.map(r => r.name));
    } catch (e) {
      return new Set();
    }
  }

  const recipeCols = getExistingCols('recipes');
  const recipeAdditions = [
    ['name_hi', 'TEXT'],
    ['name_gu', 'TEXT'],
    ['description_hi', 'TEXT'],
    ['description_gu', 'TEXT'],
    ['total_time', 'INTEGER DEFAULT 45'],
    ['prep_instructions_en', 'TEXT'],
    ['prep_instructions_hi', 'TEXT'],
    ['prep_instructions_gu', 'TEXT'],
    ['tips_en', 'TEXT'],
    ['tips_hi', 'TEXT'],
    ['tips_gu', 'TEXT'],
    ['common_mistakes_en', 'TEXT'],
    ['common_mistakes_hi', 'TEXT'],
    ['common_mistakes_gu', 'TEXT'],
    ['serving_suggestions_en', 'TEXT'],
    ['serving_suggestions_hi', 'TEXT'],
    ['serving_suggestions_gu', 'TEXT'],
    ['storage_en', 'TEXT'],
    ['storage_hi', 'TEXT'],
    ['storage_gu', 'TEXT']
  ];

  for (const [col, type] of recipeAdditions) {
    if (!recipeCols.has(col)) {
      try {
        db.exec(`ALTER TABLE recipes ADD COLUMN ${col} ${type}`);
      } catch (e) {}
    }
  }

  const ingCols = getExistingCols('recipe_ingredients');
  const ingAdditions = [
    ['name_hi', 'TEXT'],
    ['name_gu', 'TEXT'],
    ['numeric_quantity', 'REAL']
  ];
  for (const [col, type] of ingAdditions) {
    if (!ingCols.has(col)) {
      try {
        db.exec(`ALTER TABLE recipe_ingredients ADD COLUMN ${col} ${type}`);
      } catch (e) {}
    }
  }

  const stepCols = getExistingCols('recipe_steps');
  const stepAdditions = [
    ['title_hi', 'TEXT'],
    ['title_gu', 'TEXT'],
    ['instruction_hi', 'TEXT'],
    ['instruction_gu', 'TEXT'],
    ['tip_hi', 'TEXT'],
    ['tip_gu', 'TEXT'],
    ['heat_level', "TEXT DEFAULT 'Medium'"]
  ];
  for (const [col, type] of stepAdditions) {
    if (!stepCols.has(col)) {
      try {
        db.exec(`ALTER TABLE recipe_steps ADD COLUMN ${col} ${type}`);
      } catch (e) {}
    }
  }
}

// Database query helpers for clean synchronous execution
export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  return stmt.all(...params);
}

export function queryOne(sql, params = []) {
  const stmt = db.prepare(sql);
  return stmt.get(...params);
}

export function runCommand(sql, params = []) {
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}

export default {
  db,
  initSchema,
  queryAll,
  queryOne,
  runCommand
};
