# Quick Start Guide 🚀

## Local Development

### 1. Install Backend Dependencies
```bash
cd donation-backend
npm install
```

### 2. Configure Environment
Edit `donation-backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/sadaka
ADMIN_PASSWORD=sadaka2026
PORT=3000
```

### 3. Start MongoDB (Local)
```bash
# macOS (if you have MongoDB installed)
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - recommended!
# Get free cluster at: https://www.mongodb.com/cloud/atlas
```

### 4. Start Backend
```bash
cd donation-backend
npm start
```

Backend runs at: http://localhost:3000

### 5. Open Admin Panel
Open `admin-realtime.html` in your browser and login!

---

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy to Railway:**
1. Sign up at [railway.app](https://railway.app)
2. Deploy from GitHub
3. Add MongoDB plugin
4. Done! 🎉

---

## File Structure

```
sadaka/
├── index.html              # Main website (with real-time updates)
├── admin.html              # Old admin (GitHub API)
├── admin-realtime.html     # New admin (real-time backend)
├── gallery.html            # Photo gallery
├── data.json               # Static data (fallback)
├── gallery.json            # Gallery data
├── DEPLOYMENT.md           # Deployment guide
├── donation-backend/       # Real-time backend
│   ├── server.js          # Express + Socket.io server
│   ├── package.json       # Dependencies
│   ├── .env               # Environment config
│   └── README.md          # Backend documentation
├── vercel.json            # Vercel config
└── render.yaml            # Render config
```

---

## Key Features

✅ **Real-time updates** - Changes appear instantly on all devices  
✅ **Multi-device support** - Update from phone, tablet, or desktop  
✅ **Instant synchronization** - WebSocket broadcasting  
✅ **Graceful fallbacks** - Works even if backend is offline  
✅ **Gallery management** - Add/remove photos in real-time  
✅ **Mobile-friendly** - Responsive admin panel  

---

## Need Help?

1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
2. Check [donation-backend/README.md](donation-backend/README.md) for API docs
3. Open an issue on GitHub

---

**Made with ❤️ for Ramadan 2026**
