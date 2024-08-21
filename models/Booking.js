const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
