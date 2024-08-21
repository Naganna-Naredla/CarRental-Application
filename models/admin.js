// In routes/admin.js (or similar)
const express = require('express');
const router = express.Router();
const Car = require('../models/car'); // Ensure this path is correct

// Endpoint to get all cars with their availability and ratings
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
