/**
 * Workspace Flow — Response Formatter
 * @author Abdelfatah
 * Utility to produce consistent API response shapes.
 */

/**
 * Send a successful API response.
 * @param {object} res - Express response object
 * @param {object} options
 * @param {number} options.statusCode
 * @param {string} options.message
 * @param {*}      options.data
 * @param {object} options.meta  - optional pagination / extra info
 */
const sendSuccess = (res, { statusCode = 200, message = 'Success', data = null, meta = null } = {}) => {
  const payload = { success: true, message, data };
  if (meta) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

/**
 * Send an error API response.
 */
const sendError = (res, { statusCode = 500, message = 'Something went wrong', errors = [] } = {}) => {
  const payload = { success: false, message };
  if (errors.length > 0) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

module.exports = { sendSuccess, sendError };
