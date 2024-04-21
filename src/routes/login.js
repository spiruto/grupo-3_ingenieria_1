const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.ts'); // Assuming your user model file is named User.js

// Login endpoint
router.post('/', async (req, res) => {
    try {
        //console.log(req);
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password 1" });
        }

        // Check password
        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password 2" });
        }
        // Return user data (you may want to exclude sensitive information like password here)
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;



