# Workspace Flow

> A modern, full-stack SaaS workspace management application — built by **Abdelfatah**.

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Backend  | Node.js · Express 5 · MongoDB · Mongoose |
| Frontend | React 19 · Vite · Tailwind CSS v4       |
| State    | Redux Toolkit · TanStack Query          |
| Auth     | JWT (jsonwebtoken) · bcrypt             |
| Forms    | React Hook Form · Zod                   |

---

## Project Structure

```
smart-notes-project/
├── backend/                  # Express API server
│   ├── server.js            # Entry point
│   └── src/
│       ├── bootstrap.js     # App factory
│       ├── config/          # Env + DB config
│       ├── core/            # Shared middleware, exceptions, helpers
│       │   ├── exceptions/
│       │   ├── helpers/
│       │   └── middleware/
│       └── domains/
│           ├── identity/    # Auth + user (routes at /auth)
│           └── workspace/   # Notes CRUD  (routes at /notes)
│
└── frontend/                  # React SPA
    └── src/
        ├── app/             # Entry, providers, router, Redux store
        ├── services/        # Axios client + API functions
        ├── shared/          # Reusable components, layouts, hooks
        └── modules/
            ├── identity/    # Sign in, register, account
            ├── command-center/ # Dashboard + widgets
            └── workspace/   # Notes explorer + CRUD views
```

---

## Getting Started

### 1 — Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### 2 — Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URI and JWT_SECRET
npm run dev
```

Server runs on **http://localhost:3000**

### 3 — Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

Client runs on **http://localhost:5173**

---

## API Endpoints

### Identity  (`/auth`)
| Method | Path             | Auth | Description        |
|--------|------------------|------|--------------------|
| POST   | /auth/register   | No   | Create account     |
| POST   | /auth/login      | No   | Sign in            |
| GET    | /auth/me         | Yes  | Get session user   |
| PUT    | /auth/profile    | Yes  | Update profile     |
| DELETE | /auth/account    | Yes  | Delete account     |

### Workspace  (`/notes`)
| Method | Path        | Auth | Description        |
|--------|-------------|------|--------------------|
| GET    | /notes      | Yes  | Browse all items   |
| GET    | /notes/:id  | Yes  | Inspect one item   |
| POST   | /notes      | Yes  | Compose new item   |
| PUT    | /notes/:id  | Yes  | Revise an item     |
| DELETE | /notes/:id  | Yes  | Discard an item    |

**Query params for GET /notes:** `search`, `category`, `status`

---

## Features

- **Authentication** — JWT with 7-day expiry, auto-logout on 401
- **Dashboard** — Stats overview, recent items, quick actions, category breakdown, pinned items
- **Workspace Explorer** — Search, filter by category + status, pagination, delete with confirmation
- **Dark Mode** — System-aware, persisted to localStorage
- **Glassmorphism UI** — Backdrop blur, gradient accents, micro-animations
- **Fully Responsive** — Mobile sidebar with overlay, adaptive grid layouts

---

*Built with ❤️ by Abdelfatah*
