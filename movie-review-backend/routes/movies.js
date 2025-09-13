const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, addMovie, addReview } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', protect, addMovie); // admin only
router.post('/:id/reviews', protect, addReview);

module.exports = router;
