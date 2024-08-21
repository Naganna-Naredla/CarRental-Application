const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const review = require('../models/Review');

router.post('/rate-car', async (req, res) => {
    const { carName, rating } = req.body;

    try {
        // Create and save the new review
        const newReview = new Review({
            carName,
            rating,
            //customerName,
           // comment,
        });
        await newReview.save();

        // Update car's average rating
        const car = await Car.findById(carName);
        if (car) {
            // Fetch all reviews for the car
            const reviews = await Review.find({ carName });
            const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

            // Update car with new average rating
            car.averageRating = averageRating;
            await car.save();
        }

        res.status(200).json({ success: true, message: 'Rating submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Route to create a booking
router.post('/', async (req, res) => {
    const { customerName, startDate, endDate } = req.body;

    try {
        // Validate input
        if ( !customerName || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the car by ID
        const car = await car.findById(carName);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check if the car is already booked for the specified period
        const existingBooking = await Booking.findOne({
            carName: carName,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Car is already booked for the specified period' });
        }

        // Proceed with the booking
        car.status = 'Booked';
        await car.save();

        const newBooking = new Booking({customerName, startDate, endDate });
        await newBooking.save();

        // Notify clients about the booking status
        if (wss) {
            wss.broadcast({ type: 'CAR_STATUS_UPDATE',  status: 'Booked' });
        }

        res.status(200).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
