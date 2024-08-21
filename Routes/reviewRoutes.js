const express = require('express');
const router = express.Router();
const Car = require('../models/car'); // Adjust the path if needed

// Route to submit a review
router.post('/rate-car', async (req, res) => {
    const { carName, rating } = req.body;

    try {
        // Find the car by name
        const car = await Car.findOne({ name: carName });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating. Rating should be between 1 and 5.' });
        }

        // Add the rating and update the average
        car.ratings.push(rating);
        car.averageRating = car.ratings.reduce((a, b) => a + b, 0) / car.ratings.length;

        await car.save();

        res.status(200).json({ success: true, message: 'Rating submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
