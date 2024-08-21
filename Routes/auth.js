// Example login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password (adjust based on your actual authentication logic)
        const user = await User.findOne({ email });

        if (user && user.password === password) { // Check credentials
            res.json({
                message: 'Login successful'
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
