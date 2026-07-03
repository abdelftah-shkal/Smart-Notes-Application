/**
 * Workspace Flow — Global Error Middleware
 * @author Abdelfatah
 * Catches all errors thrown or passed via next(err) and sends structured responses.
 */

const HttpException = require('../exceptions/HttpException');
const { env } = require('../../config/environment.config');

// eslint-disable-next-line no-unused-vars
const globalErrorMiddleware = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url} →`, err.message);

  // ── Mongoose Validation Error ──────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // ── Mongoose Cast Error (invalid ObjectId) ─────────────────────────────
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource identifier format',
    });
  }

  // ── MongoDB Duplicate Key ──────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `${field} is already in use`,
    });
  }

  // ── Operational HTTP Exception ─────────────────────────────────────────
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors.length > 0 && { errors: err.errors }),
    });
  }

  // ── Unknown / Unhandled Error ──────────────────────────────────────────
  return res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { globalErrorMiddleware };
