const express = require('express');
const router = express.Router();
const Car = require('../models/car'); // Ensure this path is correct
const Booking = require('../models/Booking'); // Ensure this path is correct
const { sendEmail } = require('../utils/email'); // Adjust the path to where you save your email utility

// Route to create a booking
router.post('/', async (req, res) => {
    const { customerName, startDate, endDate, customerEmail } = req.body;

    try {
        // Validate input
        if (!customerName || !startDate || !endDate || !customerEmail) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the car by ID
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check if the car is already booked for the specified period
        const existingBooking = await Booking.findOne({
            carId: carId,
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

        const newBooking = new Booking({ carId, customerName, startDate, endDate });
        await newBooking.save();

        // Send an email notification
        await sendEmail(
            customerEmail,
            'Booking Confirmation',
            `Dear ${customerName},\n\nYour booking for the car with ID ${carId} has been confirmed.\nStart Date: ${startDate}\nEnd Date: ${endDate}\n\nThank you for booking with us!`
        );

        // Notify clients about the booking status
        if (wss) {
            wss.broadcast({ type: 'CAR_STATUS_UPDATE', carId, status: 'Booked' });
        }

        res.status(200).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
