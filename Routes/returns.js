// routes/returns.js

const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.post('/return', async (req, res) => {
    const { carName } = req.body;

    try {
        // Update car status to "In Garage"
        await Car.findByIdAndUpdate(carName, { status: 'In Garage' });

        // Handle return logic (e.g., update return details)
        // ...

        res.json({ message: 'Car returned successfully' });

        // Notify clients about the car status update
        notifyCarStatusChange();
    } catch (error) {
        console.error('Error returning car:', error);
        res.status(500).json({ message: 'Error returning car' });
    }
});

function notifyCarStatusChange() {
    // Broadcast updated car status via WebSocket
    // ...
}

module.exports = router;
