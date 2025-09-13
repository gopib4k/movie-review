const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');

// GET user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user profile
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.params.id }).populate('movie');
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD movie to watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const existing = await Watchlist.findOne({ user: req.params.id, movie: req.body.movieId });
    if(existing) return res.status(400).json({ message: 'Movie already in watchlist' });

    const watchlist = await Watchlist.create({ user: req.params.id, movie: req.body.movieId });
    res.status(201).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE from watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({ user: req.params.id, movie: req.params.movieId });
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
