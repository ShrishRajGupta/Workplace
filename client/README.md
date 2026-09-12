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
├── App.js            # routes
├── apiCalls.js       # auth API helper
├── context/          # AuthContext (login state)
├── components/       # screens and feature components
├── widgets/          # home/feed widgets
├── pages/messenger/  # real-time chat
└── css/              # global stylesheets
```
