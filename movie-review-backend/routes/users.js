const express = require('express');
const router = express.Router();
const { getUser, updateUser, getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.get('/:id/watchlist', protect, getWatchlist);
router.post('/:id/watchlist', protect, addToWatchlist);
router.delete('/:id/watchlist/:movieId', protect, removeFromWatchlist);

module.exports = router;
