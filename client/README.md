# Workplace — client

React (Create React App) front end for [Workplace](../README.md). See the root README for the full setup; this file only covers the client.

## Run

```bash
cp .env.example .env   # optional, see below
npm install
npm start              # http://localhost:3000
```

API requests are proxied to the Express server on `http://localhost:3001` through the `proxy` field in `package.json`, so the server must be running. Real-time chat connects to the socket server on `ws://localhost:8900`.

## Scripts

| Script | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` (gitignored) |
| `npm run lint` | ESLint over `src/` using the CRA config |

## Environment

Only variables prefixed `REACT_APP_` reach the browser. See `.env.example`.

## Layout

```
src/
├── App.js            # route tree (public, anonymous-only, protected + layout)
├── api/              # one axios instance (client.js) + per-domain calls (auth, users, posts, chat)
├── context/          # AuthContext: session user, login/register/logout, refreshUser
├── routes/           # ProtectedRoute / AnonymousRoute guards, AppLayout (navbar)
├── pages/            # one folder per routed screen: <Name>Page.jsx (+ <Name>Page.css)
├── features/         # domain components: profile/, chat/, jobs/
├── components/       # shared primitives: Navbar, ModalBox, HeroLayout
├── styles/base.css   # global reset
└── utils/            # logger, avatar fallback
```

Conventions: PascalCase file names, one component per file, CSS co-located with the component
that owns it (the resume builder keeps its CSS modules under `pages/ResumeBuilder/components`).
All server calls go through `src/api/`; components never import axios directly. The auth cookie
is httpOnly and is sent automatically (same-origin via the proxy, or `withCredentials` cross-origin).
