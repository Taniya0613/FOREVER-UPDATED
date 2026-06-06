# Forever E-Commerce

MERN stack e-commerce application with customer storefront, admin panel, and REST API.

## Project Structure

```
forever-ecommerce/
├── frontend/          # Customer website (React + Vite) → deploy on Vercel
├── admin/             # Admin dashboard (React + Vite) → deploy on Vercel
├── backend/           # Express API + MongoDB → deploy on Render
├── render.yaml        # Render deployment blueprint
└── package.json       # Root scripts for local development
```

### Folders

| Folder | Purpose | Port (local) |
|--------|---------|--------------|
| `frontend/` | Main store UI | 5173 |
| `admin/` | Product & order management | 5174 |
| `backend/` | API server | 4000 |

All frontend assets live in `frontend/src/assets/`. The backend serves the same folder at `/assets` for static files.

## Local Setup

### 1. Install dependencies

```bash
npm run install:all
```

Or install each app separately:

```bash
npm install --prefix frontend
npm install --prefix backend
npm install --prefix admin
```

### 2. Environment variables

Copy example files and fill in values:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
copy admin\.env.example admin\.env
```

**Backend** (`backend/.env`):
- `MONGODB_URI` — local: `mongodb://127.0.0.1:27017`
- `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `CLOUDINARY_*` — for image uploads

**Frontend & Admin**:
- `VITE_BACKEND_URL=http://localhost:4000`

### 3. Run locally

Start MongoDB, then run each service in a separate terminal:

```bash
npm run dev:backend
npm run dev:frontend
npm run dev:admin
```

- Store: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:4000

Default admin login: `admin@admin.com` / `admin123`

## Deploy to GitHub

1. Create a repo on GitHub (e.g. `Taniya0613/E-commerce`)
2. From project root:

```bash
git init
git add .
git commit -m "Initial commit: Forever e-commerce"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Do not commit `.env` files — they are listed in `.gitignore`.

## Deploy Backend (Render)

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Blueprint**
3. Connect your GitHub repo — Render will read `render.yaml`
4. Set environment variables in Render:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — strong random secret
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
5. Deploy — note your API URL, e.g. `https://forever-backend.onrender.com`

## Deploy Frontend (Vercel)

### Customer website

1. [Vercel](https://vercel.com) → **Add New Project** → import GitHub repo
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Environment variable:
   - `VITE_BACKEND_URL` = your Render API URL (e.g. `https://forever-backend.onrender.com`)
4. Deploy

`frontend/vercel.json` handles React Router SPA redirects.

### Admin panel (separate Vercel project)

1. New Vercel project from same repo
2. Settings:
   - **Root Directory:** `admin`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Environment variable:
   - `VITE_BACKEND_URL` = same Render API URL
4. Deploy

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Admin:** React, Vite
- **Payments:** Cash on Delivery, Google Pay (demo)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start customer store |
| `npm run dev:backend` | Start API with nodemon |
| `npm run dev:admin` | Start admin panel |
| `npm run build:frontend` | Production build for store |
| `npm run build:admin` | Production build for admin |
| `npm run start:backend` | Start API (production) |
