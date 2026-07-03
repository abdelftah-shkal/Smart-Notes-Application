/**
 * Workspace Flow — HTTP Client
 * @author Abdelfatah
 * Axios instance with auth token injection and 401 auto-logout.
 */

import axios from 'axios';
import { globalStore, clearCredentials } from '@/app/state/globalStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request Interceptor ────────────────────────────────────────────────────
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wf_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      globalStore.dispatch(clearCredentials());
    }
    return Promise.reject(error);
  }
);

export default httpClient;
