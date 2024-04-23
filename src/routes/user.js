const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.ts'); 

// Login endpoint
router.post('/', async (req, res) => {
    try {
        const {email} = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const body = req.body;
        const newUser = new User({
            name: body.name, 
            lastName: body.lastName, 
            email: body.email,  
            nationalId: body.nationalId,  
            nationalIdType: body.nationalIdType, 
            phone: body.phone, 
            password: body.password});
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
