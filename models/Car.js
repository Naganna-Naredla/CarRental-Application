const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    status: { type: String, default: 'Available' },
    ratings: [{ type: Number, min: 1, max: 5 }],
    averageRating: { type: Number, default: 0 }
});

const Car = mongoose.model('car', carSchema);

module.exports = Car;
