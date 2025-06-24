const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ApiError } = require('./errorHandler');
const logger = require('../utils/logger');

/**
 * Middleware to authenticate JWT tokens
 */
const authenticateJwt = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required. Please log in.');
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication token is missing.');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is about to expire (within 1 hour)
    const expiryThreshold = 60 * 60; // 1 hour in seconds
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp - currentTime < expiryThreshold) {
      // Add a flag to the request object to indicate token will expire soon
      req.tokenExpiringSoon = true;
    }

    // Find the user
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      throw new ApiError(401, 'User not found or no longer exists.');
    }
    
    if (!user.isActive) {
      throw new ApiError(401, 'User account is inactive. Please contact support.');
    }

    // Attach user to request object
    req.user = user;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Your session has expired. Please log in again.'));
    }
    
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid authentication token.'));
    }
    
    if (error instanceof ApiError) {
      return next(error);
    }
    
    logger.error('Authentication error:', error);
    next(new ApiError(500, 'Internal server error during authentication.'));
  }
};

/**
 * Middleware to check if user has admin role in a band
 */
const requireBandAdmin = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    const userId = req.user.id;

    const bandMember = await BandMember.findOne({
      where: {
        userId,
        bandId,
        role: 'admin',
      },
    });

    if (!bandMember) {
      throw new ApiError(403, 'You do not have permission to perform this action. Admin role required.');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateJwt,
  requireBandAdmin,
};