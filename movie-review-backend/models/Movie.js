const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], default: [] },
  releaseYear: { type: Number },
  director: { type: String },
  cast: { type: [String], default: [] },
  synopsis: { type: String },
  posterURL: { type: String },
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Movie', movieSchema);
