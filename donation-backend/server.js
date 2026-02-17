require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sadaka';
mongoose.connect(MONGODB_URI).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  familiesSupported: { type: Number, required: true, default: 0 },
  lastUpdated: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

// Admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sadaka2026';

// ==================== ROUTES ====================

// Get current donation data
app.get('/api/donation', async (req, res) => {
  try {
    let donation = await Donation.findOne().sort({ updatedAt: -1 });
    if (!donation) {
      donation = await Donation.create({
        familiesSupported: 0,
        lastUpdated: new Date().toLocaleString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }
    res.json({
      familiesSupported: donation.familiesSupported,
      lastUpdated: donation.lastUpdated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update donation data (requires password)
app.post('/api/donation/update', async (req, res) => {
  const { password, familiesSupported, lastUpdated } = req.body;
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (typeof familiesSupported !== 'number' || !lastUpdated) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const donation = await Donation.create({
      familiesSupported,
      lastUpdated,
      updatedAt: new Date()
    });

    // Broadcast update to all connected clients
    io.emit('donation-update', {
      familiesSupported: donation.familiesSupported,
      lastUpdated: donation.lastUpdated
    });

    res.json({ 
      success: true,
      data: {
        familiesSupported: donation.familiesSupported,
        lastUpdated: donation.lastUpdated
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get gallery photos
app.get('/api/gallery', async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add gallery photo (requires password)
app.post('/api/gallery/add', async (req, res) => {
  const { password, url, caption, date } = req.body;
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!url) {
    return res.status(400).json({ error: 'Photo URL is required' });
  }

  try {
    const photo = await Gallery.create({ url, caption, date });
    
    // Broadcast gallery update
    io.emit('gallery-update', { action: 'add', photo });

    res.json({ success: true, photo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete gallery photo (requires password)
app.delete('/api/gallery/:id', async (req, res) => {
  const { password } = req.body;
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    await Gallery.findByIdAndDelete(req.params.id);
    
    // Broadcast gallery update
    io.emit('gallery-update', { action: 'delete', id: req.params.id });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ==================== WEBSOCKET ====================

io.on('connection', (socket) => {
  console.log('👤 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('👋 Client disconnected:', socket.id);
  });
});

// ==================== SERVER ====================

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket ready for real-time updates`);
});
