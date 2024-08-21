const express = require('express');
const router = express.Router();

// Assuming you have a `Booking` model and are using `express`

router.get('/myBookings', async (req, res) => {
    try {
        const customerEmail = req.query.email;  // Get the customer's email from the query parameters
        const bookings = await Booking.find({ customerEmail: customerEmail })
                                      .populate('car');  // Populate the car details if needed

        res.json(bookings);  // Send the bookings as JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/book', async (req, res) => {
    const { userId, startDate, endDate } = req.body;

    if (!userId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBooking = new Booking({
            user: userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});


// Cancel a booking
router.delete('/:id/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await Booking.findOneAndDelete({ _id: req.params.id, customerEmail: user.email });
        if (!result) {
            return res.status(404).json({ message: 'Booking not found or you do not have permission to delete this booking' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
