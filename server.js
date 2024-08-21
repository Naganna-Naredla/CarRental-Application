const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Car = require('./models/car'); // Ensure this path is correct
const Booking = require('./models/Booking'); // Ensure this path is correct
const Review = require('./models/Review'); // Ensure this path is correct
const carRoutes = require('./Routes/carRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');
const myBookingsRouter = require('./Routes/myBookings'); // Make sure to create this file
const WebSocket = require('ws');
const app = express();
const port = 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb+srv://naganna3579:nagannan@cluster0.pgjrnjh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Car routes
app.use('/api/cars', carRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes);
const reviewRoutes = require('./Routes/reviewRoutes'); // Ensure this path is correct

// Review routes
app.use('/api/reviews', reviewRoutes);


// MyBookings routes
app.use('/api/myBookings', myBookingsRouter);

// Route to get car locations (used for Map View)
app.get('/cars/locations', async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car locations' });
    }
});

app.post('/api/bookings', async (req, res) => {
    const { carName, customerName, startDate, endDate } = req.body;
    try {
        const car = await Car.findById(carName);
        if (car.status === 'Booked') {
            return res.status(400).json({ message: 'Car already booked' });
        }
        car.status = 'Booked';
        await car.save();

        const newBooking = new Booking({carName, customerName, startDate, endDate });
        await newBooking.save();

        // Broadcast the updated car availability
        wss.broadcast({ type: 'CAR_STATUS_UPDATE', carName, status: 'Booked' });

        res.status(200).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel Booking route
app.delete('/api/bookings/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const car = await Car.findById(booking.carName);
        car.status = 'Available';
        await car.save();

        await Booking.findByIdAndDelete(bookingId);

        // Broadcast the updated car availability
        wss.broadcast({ type: 'CAR_STATUS_UPDATE', carName: booking.carName, status: 'Available' });

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get car locations (used for Map View)
app.get('/cars/locations', async (req, res) => {
    try {
        const cars = await Car.find({});
        // Assuming the `description` field contains garage status or other info
        res.json(cars.map(car => ({
            id: car._id,
            make: car.make,
            model: car.model,
            lat: car.latitude,  // Assuming coordinates are stored in latitude/longitude fields
            lng: car.longitude,
            status: car.status, // e.g., 'In Garage' or 'On Trip'
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car locations' });
    }
});


// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true });

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// Broadcast function to send updates to all connected clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
