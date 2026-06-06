# Deploy Forever E-Commerce

Repo: https://github.com/Taniya0613/FOREVER-UPDATED

## Order of deployment

1. **Render** — backend API (pehle yeh)
2. **Vercel** — frontend store
3. **Vercel** — admin panel (optional, alag project)

---

## Step 1: Backend on Render

1. Open [Render Dashboard](https://dashboard.render.com)
2. **New +** → **Blueprint**
3. Connect GitHub repo: `Taniya0613/FOREVER-UPDATED`
4. Render will read `render.yaml` and create `forever-backend`
5. Add these **Environment Variables**:

| Key | Value |
|-----|--------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Strong random string |
| `ADMIN_EMAIL` | admin@admin.com |
| `ADMIN_PASSWORD` | your admin password |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret |

6. Deploy karo. API URL milega jaise:
   `https://forever-backend.onrender.com`

7. Browser mein open karo — `API Working` dikhna chahiye.

### MongoDB Atlas (free)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → free cluster
2. Database Access → user banao
3. Network Access → `0.0.0.0/0` allow (Render ke liye)
4. Connect → connection string copy karo
5. Example: `mongodb+srv://user:pass@cluster.mongodb.net/e-commerce`

---

## Step 2: Frontend on Vercel

1. Open [Vercel Dashboard](https://vercel.com/new)
2. **Import** → GitHub → `FOREVER-UPDATED`
3. Project settings:

| Setting | Value |
|---------|--------|
| Root Directory | `frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. **Environment Variables**:

| Key | Value |
|-----|--------|
| `VITE_BACKEND_URL` | `https://forever-backend.onrender.com` |

5. **Deploy** → live URL milega jaise `https://forever-store.vercel.app`

---

## Step 3: Admin on Vercel (optional)

1. Vercel → **Add New Project** → same repo
2. Root Directory: `admin`
3. Build: `npm run build`, Output: `dist`
4. Env: `VITE_BACKEND_URL` = same Render URL
5. Deploy

---

## After deploy checklist

- [ ] Render backend live hai
- [ ] Frontend `VITE_BACKEND_URL` sahi hai
- [ ] Products / images load ho rahe hain
- [ ] Login / signup kaam kar raha hai
- [ ] Admin se product add ho raha hai

## Redeploy

GitHub par push karo — Render aur Vercel auto-redeploy karenge (agar connected hain).

```bash
git add .
git commit -m "Update"
git push
```
