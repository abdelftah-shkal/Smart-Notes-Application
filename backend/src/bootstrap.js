/**
 * Workspace Flow — Application Bootstrap
 * @author Abdelfatah
 * Configures Express app, middleware stack, routes, and error handling.
 */

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');

const { validateEnv } = require('./config/environment.config');
const { connectDatabase } = require('./config/database.config');
const { globalErrorMiddleware } = require('./core/middleware/globalError.middleware');

const identityRoutes = require('./domains/identity/identity.routes');
const workspaceRoutes = require('./domains/workspace/workspace.routes');

const initializeApp = () => {
  // Validate environment variables before starting
  validateEnv();

  // Connect to database
  connectDatabase();

  const app = express();

  // ─── Security Middleware ───────────────────────────────────────────────
  app.use(helmet());
  app.use(cors());
  app.use(hpp());
  app.use(xss());

  // ─── Request Parsing ───────────────────────────────────────────────────
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true }));

  // ─── Logging ───────────────────────────────────────────────────────────
  app.use(morgan('dev'));

  // ─── Health Check ──────────────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', app: 'Workspace Flow API' });
  });

  // ─── Domain Routes ─────────────────────────────────────────────────────
  // Same paths as original for frontend compatibility
  app.use('/auth', identityRoutes);
  app.use('/notes', workspaceRoutes);

  // ─── Global Error Handler ──────────────────────────────────────────────
  app.use(globalErrorMiddleware);

  return app;
};

module.exports = { initializeApp };
