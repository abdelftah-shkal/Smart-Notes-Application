/**
 * Workspace Flow — Identity Routes
 * @author Abdelfatah
 * Mounts at /auth — same paths as original for full frontend compatibility.
 */

const router = require('express').Router();
const identityController = require('./identity.controller');
const authenticateMiddleware = require('../../core/middleware/authenticate.middleware');
const schemaGuard = require('../../core/middleware/schemaGuard.middleware');
const { enrollmentSchema, credentialSchema, profileUpdateSchema } = require('./identity.schema');

// ─── Public Routes ─────────────────────────────────────────────────────────
router.post('/register', schemaGuard(enrollmentSchema), identityController.signup);
router.post('/login', schemaGuard(credentialSchema), identityController.signin);

// ─── Protected Routes ──────────────────────────────────────────────────────
router.get('/me', authenticateMiddleware, identityController.getSession);
router.put('/profile', authenticateMiddleware, schemaGuard(profileUpdateSchema), identityController.updateProfile);
router.delete('/account', authenticateMiddleware, identityController.deleteAccount);

module.exports = router;
