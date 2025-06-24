const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const bandRoutes = require('./bands');
const rehearsalRoutes = require('./rehearsals');
const availabilityRoutes = require('./availabilities');
const songRoutes = require('./songs');
const fileRoutes = require('./files');
const notificationRoutes = require('./notifications');
const { authenticateJwt } = require('../middleware/auth');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', authenticateJwt, userRoutes);
router.use('/bands', authenticateJwt, bandRoutes);
router.use('/rehearsals', authenticateJwt, rehearsalRoutes);
router.use('/availabilities', authenticateJwt, availabilityRoutes);
router.use('/songs', authenticateJwt, songRoutes);
router.use('/files', authenticateJwt, fileRoutes);
router.use('/notifications', authenticateJwt, notificationRoutes);

// Catch-all 404 route
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

module.exports = router;