/**
 * Workspace Flow — Redux Global Store
 * @author Abdelfatah
 */

import { configureStore, createSlice } from '@reduxjs/toolkit';

// ─── Identity Slice ────────────────────────────────────────────────────────
const storedToken = localStorage.getItem('wf_token');

const identitySlice = createSlice({
  name: 'identity',
  initialState: {
    accessToken: storedToken || null,
    account: null,
    isLoggedIn: !!storedToken,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, account } = action.payload;
      state.accessToken = accessToken;
      state.account = account;
      state.isLoggedIn = true;
      localStorage.setItem('wf_token', accessToken);
    },
    refreshAccount: (state, action) => {
      state.account = action.payload;
      state.isLoggedIn = true;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.account = null;
      state.isLoggedIn = false;
      localStorage.removeItem('wf_token');
    },
  },
});

// ─── Interface Slice ───────────────────────────────────────────────────────
const storedAppearance = localStorage.getItem('wf_appearance') || 'light';

// Apply initial appearance class
if (storedAppearance === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    appearance: storedAppearance,
  },
  reducers: {
    toggleAppearance: (state) => {
      const next = state.appearance === 'light' ? 'dark' : 'light';
      state.appearance = next;
      localStorage.setItem('wf_appearance', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setAppearance: (state, action) => {
      state.appearance = action.payload;
      localStorage.setItem('wf_appearance', action.payload);
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

// ─── Exports ───────────────────────────────────────────────────────────────
export const { setCredentials, refreshAccount, clearCredentials } = identitySlice.actions;
export const { toggleAppearance, setAppearance } = interfaceSlice.actions;

export const globalStore = configureStore({
  reducer: {
    identity: identitySlice.reducer,
    interface: interfaceSlice.reducer,
  },
});

export default globalStore;
