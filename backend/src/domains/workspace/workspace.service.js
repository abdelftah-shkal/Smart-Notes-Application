/**
 * Workspace Flow — Workspace Service
 * @author Abdelfatah
 * Business logic for workspace item (note) CRUD operations.
 */

const WorkspaceItem = require('./workspace.model');

/**
 * Build a MongoDB filter query from request parameters.
 */
const buildFilterQuery = (userId, { search, category, status }) => {
  const query = { user_id: userId };

  if (search && search.trim()) {
    const sanitized = search.trim();
    query.$or = [
      { title: { $regex: sanitized, $options: 'i' } },
      { content: { $regex: sanitized, $options: 'i' } },
    ];
  }

  if (category) query.category = category;
  if (status) query.status = status;

  return query;
};

/**
 * Retrieve all workspace items for a user, with optional filtering and sorting.
 */
const retrieveCollection = async (userId, filters = {}) => {
  const query = buildFilterQuery(userId, filters);
  const items = await WorkspaceItem.find(query).sort({ is_pinned: -1, createdAt: -1 });
  return { data: items };
};

/**
 * Retrieve a single workspace item by ID for a specific user.
 */
const retrieveItemById = async (itemId, userId) => {
  return WorkspaceItem.findOne({ _id: itemId, user_id: userId });
};

/**
 * Create a new workspace item.
 */
const composeItem = async (itemData) => {
  return WorkspaceItem.create(itemData);
};

/**
 * Update an existing workspace item.
 */
const modifyItem = async (itemId, userId, updates) => {
  return WorkspaceItem.findOneAndUpdate(
    { _id: itemId, user_id: userId },
    updates,
    { new: true, runValidators: true }
  );
};

/**
 * Delete a workspace item permanently.
 */
const removeItem = async (itemId, userId) => {
  const result = await WorkspaceItem.findOneAndDelete({ _id: itemId, user_id: userId });
  return !!result;
};

module.exports = {
  retrieveCollection,
  retrieveItemById,
  composeItem,
  modifyItem,
  removeItem,
};
