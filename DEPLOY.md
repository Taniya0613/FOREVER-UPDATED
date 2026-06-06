# Deploy Forever E-Commerce

Repo: https://github.com/Taniya0613/FOREVER-UPDATED

## Order of deployment

1. **Render** — backend API (pehle yeh)
2. **Vercel** — frontend store
3. **Vercel** — admin panel (optional, alag project)

---

## Step 1: Backend on Render (FREE)

### Option A — Manual (recommended, card usually NOT needed)

1. [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect repo: `Taniya0613/FOREVER-UPDATED`
3. Settings:

| Setting | Value |
|---------|--------|
| Name | `forever-backend` |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| **Instance Type** | **Free** |

4. Environment Variables add karo (neeche table)
5. **Create Web Service** — deploy free ho jayega

> Free tier: 15 min inactive ke baad sleep hota hai; pehli request par 30–60 sec lag sakta hai. [Render free docs](https://render.com/docs/free)

### Option B — Blueprint

1. **New +** → **Blueprint** → repo select karo
2. `render.yaml` mein ab `plan: free` hai
3. Agar phir bhi card maange → **Cancel** karke **Option A** use karo (Blueprint kabhi card on file maangta hai)

Blueprint card modal aaye to **Cancel** dabao aur upar wala manual Web Service method use karo.

### Environment Variables (dono options ke liye)

| Key | Value |
|-----|--------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Strong random string |
| `ADMIN_EMAIL` | admin@admin.com |
| `ADMIN_PASSWORD` | your admin password |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret |

Deploy ke baad API URL milega: `https://forever-backend.onrender.com`  
Browser mein open karo — **API Working** dikhna chahiye.

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
