# 🌙 Sadaka - Ramadan Iftar Campaign (Real-Time Edition)

> A modern, real-time donation tracking platform with instant updates across all devices.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-blue)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## ✨ Features

### 🚀 Real-Time Updates
- **Instant synchronization** across all devices using WebSocket
- Update from phone, tablet, or desktop - see changes everywhere immediately
- No page refresh required

### 📊 Dashboard
- Live donation counter with smooth animations
- Progress bar showing families supported (goal: 1000 families)
- Amount raised tracker (€10 per family)
- Last updated timestamp

### 🔐 Admin Panel
- Password-protected access
- Intuitive slider or direct input for family count
- Real-time preview before updating
- Gallery management (add/remove photos)
- Works from any device, anywhere

### 🗄️ Backend Features
- MongoDB database for reliable data storage
- RESTful API endpoints
- WebSocket broadcasting for instant updates
- CORS enabled for cross-origin requests
- Graceful fallbacks if backend unavailable

### 🌍 Multi-Device Support
- Responsive design for mobile, tablet, desktop
- Update from anywhere with internet
- All connected clients update simultaneously

---

## 🎯 Quick Start

### Option 1: Local Development

```bash
# 1. Install dependencies
cd donation-backend
npm install

# 2. Configure environment
# Edit donation-backend/.env with your MongoDB URI

# 3. Start backend
npm start

# 4. Open admin-realtime.html in browser
```

### Option 2: Deploy to Cloud (Recommended)

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment to:
- **Railway** (easiest - recommended)
- **Render** (free tier)
- **Vercel** (serverless)

---

## 📁 Project Structure

```
sadaka/
├── 🌐 Frontend Files
│   ├── index.html              # Main campaign website
│   ├── admin-realtime.html     # Real-time admin panel (NEW!)
│   ├── admin.html              # Legacy admin (GitHub API)
│   ├── gallery.html            # Photo gallery page
│   ├── data.json               # Static data (fallback)
│   └── gallery.json            # Gallery data
│
├── ⚙️ Backend (NEW!)
│   └── donation-backend/
│       ├── server.js           # Express + Socket.io server
│       ├── package.json        # Dependencies
│       ├── .env                # Environment config
│       └── README.md           # API documentation
│
├── 📚 Documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── QUICKSTART.md           # Quick start guide
│   └── README.md               # This file
│
└── 🔧 Config Files
    ├── vercel.json             # Vercel deployment config
    ├── render.yaml             # Render deployment config
    └── .gitignore              # Git ignore rules
```

---

## 🔌 API Endpoints

### Get Donation Data
```http
GET /api/donation
```

### Update Donation (Admin)
```http
POST /api/donation/update
Content-Type: application/json

{
  "password": "your-password",
  "familiesSupported": 50,
  "lastUpdated": "17 Feb 2026, 14:30"
}
```

### Gallery Management
```http
GET /api/gallery              # Get all photos
POST /api/gallery/add         # Add photo (admin)
DELETE /api/gallery/:id       # Delete photo (admin)
```

### Health Check
```http
GET /api/health
```

See full API docs: [donation-backend/README.md](donation-backend/README.md)

---

## 🔌 WebSocket Events

The backend broadcasts these events to all connected clients:

- `donation-update` - Fired when donation data changes
- `gallery-update` - Fired when gallery is modified

Example client code:
```javascript
const socket = io('https://your-backend-url.com');

socket.on('donation-update', (data) => {
  // Update UI with new data
  console.log('Families:', data.familiesSupported);
});
```

---

## 🎨 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Socket.io Client (WebSocket)
- Google Fonts (Noto Sans Bengali, Poppins)
- Responsive design (mobile-first)

### Backend
- Node.js + Express
- Socket.io (WebSocket)
- MongoDB + Mongoose
- CORS middleware
- dotenv (environment config)

---

## 🚀 Deployment Options

| Platform | Difficulty | Cost | Backend | MongoDB | Recommendation |
|----------|-----------|------|---------|---------|----------------|
| **Railway** | ⭐ Easy | Free tier | ✅ | ✅ Built-in | **Best for beginners** |
| **Render** | ⭐⭐ Medium | Free tier | ✅ | MongoDB Atlas | Good option |
| **Vercel** | ⭐⭐⭐ Hard | Free tier | ✅ Serverless | MongoDB Atlas | Advanced users |

**Recommended:** Railway - includes free MongoDB, easiest setup.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🔐 Security

- Password-protected admin endpoints
- Environment variables for secrets
- CORS configured properly
- MongoDB authentication
- HTTPS in production (auto-provided by platforms)

**Before deploying:**
1. Change `ADMIN_PASSWORD` in environment variables
2. Use strong MongoDB password
3. Limit MongoDB IP whitelist in production

---

## 📱 Usage

### For Admins:

1. **Open Admin Panel**
   - URL: `https://yoursite.com/admin-realtime.html`
   - Login with your password

2. **Update Donation Count**
   - Use slider or enter exact number
   - See real-time preview
   - Click "Update Live Website"
   - Changes appear instantly on all devices!

3. **Manage Gallery**
   - Add photos with URL and caption
   - Delete photos
   - Updates broadcast in real-time

### For Visitors:

- Visit main website: `https://yoursite.com/`
- See live donation progress
- View gallery
- Updates appear automatically (no refresh needed!)

---

## 🌟 What's New (v2.0)

### ✅ Completed Upgrades

1. **Real-Time Backend**
   - Express + MongoDB + Socket.io server
   - RESTful API endpoints
   - WebSocket broadcasting

2. **New Admin Portal**
   - `admin-realtime.html` - works with backend
   - Real-time status indicator
   - Instant updates across devices

3. **Enhanced Main Website**
   - Auto-connects to backend for instant updates
   - Graceful fallback to static files
   - WebSocket support with polling fallback

4. **Deployment Ready**
   - Configuration files for Railway, Render, Vercel
   - Complete deployment guides
   - MongoDB Atlas integration

5. **Documentation**
   - Comprehensive deployment guide
   - Quick start guide
   - API documentation
   - Security best practices

---

## 🎯 Why This Upgrade?

### Before (Old System)
- ❌ Updates via GitHub API (slow)
- ❌ Takes 1-5 minutes to appear
- ❌ Manual page refresh needed
- ❌ GitHub token required
- ❌ Limited to single device workflow

### After (New System)
- ✅ Instant updates (< 1 second)
- ✅ Real-time broadcasting to all devices
- ✅ No page refresh needed
- ✅ Professional backend infrastructure
- ✅ Update from phone, tablet, desktop simultaneously

---

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
- **[donation-backend/README.md](donation-backend/README.md)** - Backend API docs

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - feel free to use for your own campaigns!

---

## 🙏 Acknowledgments

- MongoDB Atlas for free database hosting
- Socket.io for real-time framework
- Railway/Render for free backend hosting
- GitHub Pages for frontend hosting

---

## 📞 Support

Need help?
1. Check documentation files
2. Review backend README
3. Open an issue on GitHub
4. Check logs in your deployment platform

---

**Made with ❤️ for Ramadan 2026**  
*May this platform help feed many families during the blessed month.*

---

## 🎉 Getting Started

**Ready to deploy?**

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
3. Update from anywhere, see changes everywhere! 🚀
