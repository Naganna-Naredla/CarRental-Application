const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new customer
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = new Customer({ email, password: hashedPassword, name });
        await customer.save();
        res.status(201).json({ message: 'Customer registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login a customer
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token (you can use a more secure key)
        const token = jwt.sign({ customerId: customer._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to verify token
router.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.customerId = decoded.customerId;
        next();
    });
});

module.exports = router;
