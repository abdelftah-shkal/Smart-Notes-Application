/**
 * Workspace Flow — Identity API
 * @author Abdelfatah
 * API functions for authentication and user identity operations.
 */

import httpClient from './httpClient';

/** POST /auth/register — Create a new account */
export const enrollAccount = (data) =>
  httpClient.post('/auth/register', data).then((r) => r.data);

/** POST /auth/login — Authenticate and receive a token */
export const authenticateAccount = (data) =>
  httpClient.post('/auth/login', data).then((r) => r.data);

/** GET /auth/me — Fetch the current session user */
export const fetchCurrentSession = () =>
  httpClient.get('/auth/me').then((r) => r.data);

/** PUT /auth/profile — Update the current user's profile */
export const updateAccountProfile = (data) =>
  httpClient.put('/auth/profile', data).then((r) => r.data);

/** DELETE /auth/account — Permanently delete the current account */
export const removeCurrentAccount = () =>
  httpClient.delete('/auth/account').then((r) => r.data);
