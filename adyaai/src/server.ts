import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import express from 'express';

import { ollamaClient } from './ai/ollama-client.js';
import { config } from './config/index.js';
import { componentRegistry } from './metadata/registry.js';
import { analyzeRouter } from './routes/analyze.js';
import { generateUIRouter } from './routes/generate-ui.js';
import { suggestRouter } from './routes/suggest.js';
import { themeRouter } from './routes/theme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: config.server.corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const ollamaHealthy = await ollamaClient.checkHealth();
  const modelAvailable = await ollamaClient.isModelAvailable();
  
  res.json({
    status: 'ok',
    ollama: {
      healthy: ollamaHealthy,
      model: config.ollama.model,
      modelAvailable,
    },
    components: {
      count: componentRegistry.getCount(),
      categories: componentRegistry.getCategories(),
    },
  });
});

// API routes
app.use('/api/suggest', suggestRouter);
app.use('/api/generate-ui', generateUIRouter);
app.use('/api/theme', themeRouter);
app.use('/api/analyze', analyzeRouter);

// Component metadata endpoint
app.get('/api/components', (req, res) => {
  const components = componentRegistry.getAll();
  res.json({
    success: true,
    data: components,
  });
});

// Refresh metadata endpoint
app.post('/api/components/refresh', async (req, res) => {
  try {
    await componentRegistry.refresh();
    res.json({
      success: true,
      message: 'Component metadata refreshed',
      count: componentRegistry.getCount(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Initialize and start server
async function startServer() {
  try {
    console.log('🚀 Starting AdyaAI Server...\n');
    
    // Initialize component registry
    console.log('📊 Loading component metadata...');
    await componentRegistry.initialize();
    console.log(`✅ Loaded ${componentRegistry.getCount()} components\n`);
    
    // Check Ollama connection
    console.log('🤖 Checking Ollama connection...');
    const ollamaHealthy = await ollamaClient.checkHealth();
    if (!ollamaHealthy) {
      console.warn('⚠️  Warning: Ollama is not available. Please ensure Ollama is running.');
      console.warn('   Run: ollama serve');
    } else {
      console.log('✅ Ollama is running');
      
      const modelAvailable = await ollamaClient.isModelAvailable();
      if (!modelAvailable) {
        console.warn(`⚠️  Warning: Model "${config.ollama.model}" is not available.`);
        console.warn(`   Run: ollama pull ${config.ollama.model}`);
      } else {
        console.log(`✅ Model "${config.ollama.model}" is available\n`);
      }
    }
    
    // Start server
    const port = config.server.port;
    app.listen(port, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🎉 AdyaAI Server is running!`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📍 Dashboard: http://localhost:${port}`);
      console.log(`🔌 API: http://localhost:${port}/api`);
      console.log(`💚 Health: http://localhost:${port}/api/health`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
      console.log('Available endpoints:');
      console.log('  POST /api/suggest - Component suggestions');
      console.log('  POST /api/generate-ui - UI generation');
      console.log('  POST /api/theme - Theme generation');
      console.log('  POST /api/analyze - Code analysis');
      console.log('  POST /api/analyze/improve - Code improvement');
      console.log('  GET  /api/components - Component metadata');
      console.log('  POST /api/components/refresh - Refresh metadata\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
