import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { initSchema, queryOne } from './db/database.js';
import { seedDatabase } from './db/seed.js';

import authRoutes from './routes/auth.js';
import recipesRoutes from './routes/recipes.js';
import aiRoutes from './routes/ai.js';
import favoritesRoutes from './routes/favorites.js';
import historyRoutes from './routes/history.js';
import categoriesRoutes from './routes/categories.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Check and initialize schema and seed if empty
async function bootstrap() {
  try {
    initSchema();
    const countCheck = queryOne('SELECT COUNT(*) as count FROM recipes');
    if (!countCheck || countCheck.count < 140) {
      console.log('⚡ Auto-seeding full RasoiVerse recipe database (141 recipes)...');
      await seedDatabase();
    } else {
      console.log(`✨ RasoiVerse database ready with ${countCheck.count} recipes.`);
    }
  } catch (err) {
    console.error('Database bootstrap error:', err);
  }
}
bootstrap();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'RasoiVerse API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/admin', adminRoutes);

// Serve images directly from client public and dist directories
const clientPublic = path.resolve(__dirname, '../../client/public');
app.use('/images', express.static(path.join(clientPublic, 'images')));
if (fs.existsSync(clientDist)) {
  app.use('/images', express.static(path.join(clientDist, 'images')));
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Fallback 404 for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'An unexpected internal error occurred' });
});

app.listen(PORT, HOST, () => {
  console.log(`🍛 RasoiVerse API production server running on http://${HOST}:${PORT}`);
});
