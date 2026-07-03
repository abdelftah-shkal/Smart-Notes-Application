/**
 * Workspace Flow — Identity Controller
 * @author Abdelfatah
 * Handles HTTP requests for authentication and user profile operations.
 */

const identityService = require('./identity.service');
const HttpException = require('../../core/exceptions/HttpException');

// ─── Auth Handlers ─────────────────────────────────────────────────────────

/**
 * POST /auth/register
 * Register a new user account.
 */
const signup = async (req, res) => {
  const existingUser = await identityService.locateByEmail(req.body.email);
  if (existingUser) {
    throw HttpException.conflict('An account with this email already exists');
  }

  const account = await identityService.enrollUser(req.body);

  res.status(201).json({
    message: 'Account created successfully. Please sign in to continue.',
    data: account,
  });
};

/**
 * POST /auth/login
 * Authenticate user and return a JWT access token.
 */
const signin = async (req, res) => {
  const { email, password } = req.body;

  const account = await identityService.locateByEmail(email);
  if (!account) {
    throw HttpException.unauthorized('Invalid email or password');
  }

  const passwordMatches = await identityService.verifySecret(password, account.password);
  if (!passwordMatches) {
    throw HttpException.unauthorized('Invalid email or password');
  }

  const accessToken = identityService.generateAccessToken(account);

  res.status(200).json({
    message: 'Signed in successfully',
    data: account,
    token: accessToken,
  });
};

/**
 * GET /auth/me
 * Return the currently authenticated user's profile.
 */
const getSession = async (req, res) => {
  const account = await identityService.locateById(req.user.id);
  if (!account) {
    throw HttpException.notFound('User account not found');
  }

  res.json({
    message: 'Session retrieved successfully',
    data: account,
  });
};

// ─── Profile Handlers ──────────────────────────────────────────────────────

/**
 * PUT /auth/profile
 * Update the current user's profile details.
 */
const updateProfile = async (req, res) => {
  const updated = await identityService.modifyProfile(req.user.id, req.body);
  if (!updated) {
    throw HttpException.notFound('User account not found');
  }

  res.json({
    message: 'Profile updated successfully',
    data: updated,
  });
};

/**
 * DELETE /auth/account
 * Permanently delete the current user's account.
 */
const deleteAccount = async (req, res) => {
  await identityService.removeAccount(req.user.id);
  res.json({ message: 'Account deleted successfully' });
};

module.exports = {
  signup,
  signin,
  getSession,
  updateProfile,
  deleteAccount,
};
