/**
 * Workspace Flow — Workspace Routes
 * @author Abdelfatah
 * Mounts at /notes — same paths as original for full frontend compatibility.
 */

const router = require('express').Router();
const workspaceController = require('./workspace.controller');
const authenticateMiddleware = require('../../core/middleware/authenticate.middleware');
const schemaGuard = require('../../core/middleware/schemaGuard.middleware');
const { composeItemSchema, reviseItemSchema } = require('./workspace.schema');

// All workspace routes require authentication
router.use(authenticateMiddleware);

router.get('/', workspaceController.browse);
router.get('/:id', workspaceController.inspect);
router.post('/', schemaGuard(composeItemSchema), workspaceController.compose);
router.put('/:id', schemaGuard(reviseItemSchema), workspaceController.revise);
router.delete('/:id', workspaceController.discard);

module.exports = router;
