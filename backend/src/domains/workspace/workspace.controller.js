/**
 * Workspace Flow — Workspace Controller
 * @author Abdelfatah
 * Handles HTTP requests for workspace item (note) CRUD operations.
 */

const workspaceService = require('./workspace.service');
const HttpException = require('../../core/exceptions/HttpException');

/**
 * GET /notes
 * Browse all workspace items for the current user.
 */
const browse = async (req, res) => {
  const { search, category, status } = req.query;
  const result = await workspaceService.retrieveCollection(req.user.id, { search, category, status });
  res.json({ message: 'Items retrieved successfully', data: result });
};

/**
 * GET /notes/:id
 * Inspect a single workspace item by ID.
 */
const inspect = async (req, res) => {
  const item = await workspaceService.retrieveItemById(req.params.id, req.user.id);
  if (!item) throw HttpException.notFound('Workspace item not found');
  res.json({ message: 'Item retrieved successfully', data: item });
};

/**
 * POST /notes
 * Compose a new workspace item.
 */
const compose = async (req, res) => {
  const newItem = await workspaceService.composeItem({
    ...req.body,
    user_id: req.user.id,
  });
  res.status(201).json({ message: 'Item created successfully', data: newItem });
};

/**
 * PUT /notes/:id
 * Revise an existing workspace item.
 */
const revise = async (req, res) => {
  const updated = await workspaceService.modifyItem(req.params.id, req.user.id, req.body);
  if (!updated) throw HttpException.notFound('Workspace item not found');
  res.json({ message: 'Item updated successfully', data: updated });
};

/**
 * DELETE /notes/:id
 * Discard (permanently delete) a workspace item.
 */
const discard = async (req, res) => {
  const deleted = await workspaceService.removeItem(req.params.id, req.user.id);
  if (!deleted) throw HttpException.notFound('Workspace item not found');
  res.json({ message: 'Item deleted successfully' });
};

module.exports = { browse, inspect, compose, revise, discard };
