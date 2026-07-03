/**
 * Workspace Flow — Authentication Middleware
 * @author Abdelfatah
 * Verifies JWT tokens and attaches decoded payload to req.user.
 */

const jwt = require('jsonwebtoken');
const HttpException = require('../exceptions/HttpException');
const { env } = require('../../config/environment.config');

const authenticateMiddleware = (req, _res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(HttpException.unauthorized('Access token is required'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(HttpException.unauthorized('Access token is missing'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(HttpException.unauthorized('Access token has expired'));
    }
    return next(HttpException.unauthorized('Invalid access token'));
  }
};

module.exports = authenticateMiddleware;
