# GitHub Upload Guide

See [README.md](./README.md) for full setup and deployment instructions.

## Quick Upload Steps

1. Install Git: https://git-scm.com/download/win

2. Open PowerShell in the project folder:

```powershell
cd c:\Users\asus\Desktop\E-commerce-main
git init
git add .
git commit -m "Initial commit: Forever e-commerce"
git branch -M main
git remote add origin https://github.com/Taniya0613/E-commerce.git
git push -u origin main
```

Or run the helper script:

```powershell
.\upload-to-github.ps1
```

## Important

- Never commit `.env` files (already in `.gitignore`)
- `node_modules/` and `dist/` are ignored automatically
- Deploy **frontend** and **admin** on Vercel (set Root Directory in project settings)
- Deploy **backend** on Render using `render.yaml`

## After GitHub Push

1. **Render** — connect repo, use Blueprint with `render.yaml`, add MongoDB Atlas URI
2. **Vercel (store)** — Root Directory: `frontend`, env: `VITE_BACKEND_URL`
3. **Vercel (admin)** — Root Directory: `admin`, env: `VITE_BACKEND_URL`
