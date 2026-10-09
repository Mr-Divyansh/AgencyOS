# AgencyOS — Deployment Guide

## 1. Environment Architecture
AgencyOS is hosted on Google Cloud Run via Google AI Studio.
- Runtime: Node.js 22 LTS
- Development: `npm run dev` (starts `server.ts` with Vite middlewares on port 3000)
- Production: `npm run build` compiles frontend assets to `dist/`, then `npm start` serves the app via Express.

## 2. Environment Variables
See `.env.example` for reference:
- `PORT`: Server listening port (default: 3000)
- `NODE_ENV`: `development` | `production`
- `APP_URL`: Self-referential URL for links and webhooks

## 3. Seed Data
Initial persistent database state is seeded automatically on first boot into `data/database.json`.
