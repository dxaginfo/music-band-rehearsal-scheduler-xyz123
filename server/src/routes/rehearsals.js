const express = require('express');
const router = express.Router();
const { 
  createRehearsal,
  getAllRehearsals,
  getRehearsalById,
  getBandRehearsals,
  updateRehearsal,
  deleteRehearsal,
  cancelRehearsal,
  createRecurringRehearsals,
  getSuggestedRehearsalTimes,
  getUpcomingRehearsals,
  getRehearsalAttendees,
  addSongToRehearsal,
  removeSongFromRehearsal,
  getRehearsalSongs
} = require('../controllers/rehearsal');
const { requireBandAdmin } = require('../middleware/auth');
const { validateRehearsalCreation, validateRehearsalUpdate } = require('../middleware/validators/rehearsal');

/**
 * @route   POST /api/rehearsals
 * @desc    Create a new rehearsal
 * @access  Private
 */
router.post('/', validateRehearsalCreation, createRehearsal);

/**
 * @route   POST /api/rehearsals/recurring
 * @desc    Create recurring rehearsals
 * @access  Private
 */
router.post('/recurring', validateRehearsalCreation, createRecurringRehearsals);

/**
 * @route   GET /api/rehearsals
 * @desc    Get all rehearsals for the authenticated user
 * @access  Private
 */
router.get('/', getAllRehearsals);

/**
 * @route   GET /api/rehearsals/upcoming
 * @desc    Get upcoming rehearsals for the authenticated user
 * @access  Private
 */
router.get('/upcoming', getUpcomingRehearsals);

/**
 * @route   GET /api/rehearsals/suggested
 * @desc    Get suggested rehearsal times based on band availability
 * @access  Private
 */
router.get('/suggested/:bandId', getSuggestedRehearsalTimes);

/**
 * @route   GET /api/rehearsals/band/:bandId
 * @desc    Get all rehearsals for a band
 * @access  Private
 */
router.get('/band/:bandId', getBandRehearsals);

/**
 * @route   GET /api/rehearsals/:id
 * @desc    Get a rehearsal by ID
 * @access  Private
 */
router.get('/:id', getRehearsalById);

/**
 * @route   PUT /api/rehearsals/:id
 * @desc    Update a rehearsal
 * @access  Private
 */
router.put('/:id', validateRehearsalUpdate, updateRehearsal);

/**
 * @route   DELETE /api/rehearsals/:id
 * @desc    Delete a rehearsal
 * @access  Private (Band Admin only)
 */
router.delete('/:id', requireBandAdmin, deleteRehearsal);

/**
 * @route   POST /api/rehearsals/:id/cancel
 * @desc    Cancel a rehearsal
 * @access  Private
 */
router.post('/:id/cancel', cancelRehearsal);

/**
 * @route   GET /api/rehearsals/:id/attendees
 * @desc    Get all attendees for a rehearsal
 * @access  Private
 */
router.get('/:id/attendees', getRehearsalAttendees);

/**
 * @route   POST /api/rehearsals/:id/songs
 * @desc    Add a song to rehearsal
 * @access  Private
 */
router.post('/:id/songs', addSongToRehearsal);

/**
 * @route   DELETE /api/rehearsals/:id/songs/:songId
 * @desc    Remove a song from rehearsal
 * @access  Private
 */
router.delete('/:id/songs/:songId', removeSongFromRehearsal);

/**
 * @route   GET /api/rehearsals/:id/songs
 * @desc    Get all songs for a rehearsal
 * @access  Private
 */
router.get('/:id/songs', getRehearsalSongs);

module.exports = router;