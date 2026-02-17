# 🚀 Deployment Guide - Real-Time Sadaka Campaign

This guide will help you deploy your backend to make the donation system work from **any device, anywhere**.

## 📋 Prerequisites

1. GitHub account
2. MongoDB Atlas account (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
3. Choose ONE deployment platform:
   - **Railway** (Recommended - Easiest)
   - **Render** (Free tier available)
   - **Vercel** (For serverless)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** → Sign up
3. Create a **Free Cluster** (M0 Sandbox)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sadaka?retryWrites=true&w=majority
   ```
6. **Important:** Replace `<password>` with your actual password!
7. Under **Network Access**, add `0.0.0.0/0` (allow all IPs) for development

---

## 🚂 Option A: Deploy to Railway (RECOMMENDED)

**Why Railway?** Easiest setup, free tier, built-in MongoDB support.

### Steps:

1. **Sign Up**
   - Go to [railway.app](https://railway.app)
   - Click **"Start a New Project"**
   - Connect your GitHub account

2. **Create Project**
   - Click **"Deploy from GitHub repo"**
   - Select your `sadaka` repository
   - Railway will auto-detect Node.js

3. **Add MongoDB Plugin**
   - In your project dashboard, click **"+ New"**
   - Select **"Database" → "Add MongoDB"**
   - Railway automatically provisions a database!

4. **Set Environment Variables**
   - Click on your service (backend)
   - Go to **"Variables"** tab
   - Add these variables:
     ```
     MONGODB_URI = mongodb://mongo:xxxxx@containers... (automatically provided by Railway)
     ADMIN_PASSWORD = sadaka2026
     PORT = 3000
     ```
   - Note: If using Railway's MongoDB, it auto-sets `MONGODB_URI`

5. **Configure Build**
   - Go to **Settings** → **Build**
   - Root Directory: `donation-backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

6. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Copy your deployment URL (e.g., `https://sadaka-backend-production.up.railway.app`)

7. **Update Frontend**
   - In `admin-realtime.html` and `index.html`, change:
     ```javascript
     const API_URL = 'https://your-railway-url.up.railway.app';
     ```

✅ **Done!** Your backend is live and accessible from anywhere!

---

## 🎨 Option B: Deploy to Render

**Why Render?** Free tier, simple setup, good for beginners.

### Steps:

1. **Sign Up**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repo
   - Select `sadaka` repository

3. **Configure**
   - Name: `sadaka-backend`
   - Root Directory: `donation-backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables**
   - Add these in the dashboard:
     ```
     MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/sadaka
     ADMIN_PASSWORD = sadaka2026
     PORT = 10000
     ```
   - Use your MongoDB Atlas connection string!

5. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment (3-5 minutes)
   - Copy your URL: `https://sadaka-backend.onrender.com`

6. **Update Frontend**
   - Change `API_URL` in both HTML files to your Render URL

✅ **Live!**

---

## ⚡ Option C: Deploy to Vercel (Serverless)

**Why Vercel?** Ultra-fast CDN, free tier, automatic deployments.

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd sadaka
   vercel
   ```

4. **Set Environment Variables** (in Vercel dashboard)
   - Go to your project → Settings → Environment Variables
   - Add:
     ```
     MONGODB_URI = your_mongodb_atlas_connection_string
     ADMIN_PASSWORD = sadaka2026
     ```

5. **Update Frontend**
   - Change `API_URL` to your Vercel URL

---

## 📱 Step 2: Update Your Website

After deploying the backend, update these files:

### 1. Update `admin-realtime.html`

```javascript
const API_URL = "https://your-deployed-backend-url.com";
```

### 2. Update `index.html`

```javascript
const API_URL = 'https://your-deployed-backend-url.com';
```

### 3. Commit and Push

```bash
git add .
git commit -m "Update API URLs for production"
git push origin main
```

---

## 🎯 Step 3: Test It!

1. **Open Admin Panel**
   - Go to: `https://yourusername.github.io/sadaka/admin-realtime.html`
   - Login with password: `sadaka2026`

2. **Update Families Count**
   - Change the slider or input
   - Click **"Update Live Website"**

3. **Check Main Website**
   - Open: `https://yourusername.github.io/sadaka/`
   - Should update **instantly**! ⚡

4. **Test from Mobile**
   - Open admin panel on your phone
   - Make a change
   - Check website on desktop/tablet - should update in real-time!

---

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify all environment variables are set
- Check logs in your platform dashboard

### CORS errors
- Backend already has CORS enabled for all origins
- If still having issues, check browser console

### Updates not appearing
- Check if backend is running (visit `/api/health`)
- Check WebSocket connection in browser console
- Clear browser cache

### MongoDB connection failed
- Make sure IP whitelist includes `0.0.0.0/0`
- Verify password in connection string
- Check MongoDB Atlas cluster is running

---

## 🔐 Security Best Practices

Before going live:

1. **Change Admin Password**
   - Update `ADMIN_PASSWORD` in environment variables
   - Use a strong, unique password

2. **Secure MongoDB**
   - Don't use weak passwords
   - Limit IP whitelist in production

3. **Use HTTPS**
   - All platforms provide HTTPS by default
   - Never use HTTP in production

4. **Environment Variables**
   - Never commit `.env` file
   - Use platform secret storage

---

## 📊 Monitoring

### Check Backend Health
```
https://your-backend-url.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-02-17T...",
  "mongodb": "connected"
}
```

### View Logs
- **Railway:** Click your service → Logs
- **Render:** Dashboard → Logs tab
- **Vercel:** Dashboard → Functions → View logs

---

## 🎉 You're Done!

Your donation system is now:
- ✅ Accessible from any device
- ✅ Updates instantly in real-time
- ✅ Uses professional database (MongoDB)
- ✅ Deployed to the cloud
- ✅ Free to host!

**Admin Panel:** `https://yourusername.github.io/sadaka/admin-realtime.html`  
**Main Website:** `https://yourusername.github.io/sadaka/`

Update from anywhere - phone, tablet, laptop - and see changes instantly on all devices! 🚀
