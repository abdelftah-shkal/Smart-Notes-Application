/**
 * Workspace Flow — Identity Service
 * @author Abdelfatah
 * Handles all user-related business logic: registration, authentication, profile management.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const IdentityModel = require('./identity.model');
const { env } = require('../../config/environment.config');

const SALT_ROUNDS = 10;

// ─── Account Management ────────────────────────────────────────────────────

/**
 * Register a new user account.
 */
const enrollUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const account = await IdentityModel.create({
    ...userData,
    password: hashedPassword,
  });
  return account;
};

/**
 * Find a user by their email address.
 */
const locateByEmail = async (email) => {
  return IdentityModel.findOne({ email }).select('+password');
};

/**
 * Find a user by their ID.
 */
const locateById = async (id) => {
  return IdentityModel.findById(id);
};

/**
 * Update a user's profile information.
 */
const modifyProfile = async (id, updates) => {
  return IdentityModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

/**
 * Permanently remove a user account.
 */
const removeAccount = async (id) => {
  await IdentityModel.findByIdAndDelete(id);
  return true;
};

// ─── Authentication ────────────────────────────────────────────────────────

/**
 * Compare a plain-text password against a hashed password.
 */
const verifySecret = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generate a signed JWT access token for a given user.
 */
const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

/**
 * Decode and verify a JWT token.
 */
const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    return null;
  }
};

module.exports = {
  enrollUser,
  locateByEmail,
  locateById,
  modifyProfile,
  removeAccount,
  verifySecret,
  generateAccessToken,
  decodeAccessToken,
};
