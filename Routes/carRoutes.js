const express = require('express');
const router = express.Router();
const Car = require('../models/car');


// Add a new car
router.post('/', async (req, res) => {
  const { make, model, year, registration, fuelType, color, price, description } = req.body;
  try {
      const car = new Car({ make, model, year, registration, fuelType, color, price, description });
      await car.save();
      res.status(201).json({ message: 'Car added successfully', car });
  } catch (error) {
      console.error('Error adding car:', error);
      res.status(500).json({ message: 'Error adding car' });
  }
});

// Get all cars with optional search parameters
router.get('/', async (req, res) => {
    try {
        const { make, model, year, registration } = req.query;
        const query = {};

        if (make) query.make = make;
        if (model) query.model = model;
        if (year) query.year = year;
        if (registration) query.registration = registration;

        const cars = await Car.find(query);
        res.json(cars);
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ message: 'Failed to fetch cars' });
    }
});

// Fetch all available cars
router.get('/available', async (req, res) => {
    try {
      const cars = await Car.find({ status: 'Available' });
      res.json(cars);
    } catch (error) {
      res.status(500).send('Error fetching available cars');
    }
});

module.exports = router;
