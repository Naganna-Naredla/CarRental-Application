const express = require('express');
const router = express.Router();


// Get bookings for a specific user
router.get('/my-bookings', async (req, res) => {
    const { email } = req.query; // Assuming email is passed as a query parameter

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookings = await Booking.find({ user: user._id }).populate('car');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel a booking
router.delete('/my-bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
