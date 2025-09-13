const Movie = require('../models/Movie');
const Review = require('../models/Review');

// GET all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single movie
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({ message: 'Movie not found' });
    const reviews = await Review.find({ movie: movie._id }).populate('user', 'username');
    res.json({ movie, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new movie (admin only, assume middleware)
exports.addMovie = async (req, res) => {
  const { title, genre, releaseYear, director, cast, synopsis, posterURL } = req.body;
  try {
    const movie = await Movie.create({ title, genre, releaseYear, director, cast, synopsis, posterURL });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST review
exports.addReview = async (req, res) => {
  const { rating, text } = req.body;
  try {
    const review = await Review.create({
      user: req.user._id,
      movie: req.params.id,
      rating,
      text
    });

    // Update average rating
    const reviews = await Review.find({ movie: req.params.id });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(req.params.id, { averageRating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
