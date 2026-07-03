/**
 * Workspace Flow — Workspace API
 * @author Abdelfatah
 * API functions for workspace item (note) CRUD operations.
 */

import httpClient from './httpClient';

/** GET /notes — Fetch all items with optional filters */
export const browseItems = (params = {}) =>
  httpClient.get('/notes', { params }).then((r) => r.data);

/** GET /notes/:id — Fetch a single item by ID */
export const inspectItem = (id) =>
  httpClient.get(`/notes/${id}`).then((r) => r.data);

/** POST /notes — Create a new workspace item */
export const composeItem = (data) =>
  httpClient.post('/notes', data).then((r) => r.data);

/** PUT /notes/:id — Update an existing workspace item */
export const reviseItem = (id, data) =>
  httpClient.put(`/notes/${id}`, data).then((r) => r.data);

/** DELETE /notes/:id — Permanently remove a workspace item */
export const discardItem = (id) =>
  httpClient.delete(`/notes/${id}`).then((r) => r.data);
