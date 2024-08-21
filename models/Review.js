const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
   carName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
