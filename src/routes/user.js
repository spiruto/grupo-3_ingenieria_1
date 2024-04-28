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
            return res.status(400).json({ message: "Correo ya esta registrado" });
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

        res.status(201).json({ message: "Usuario Creado Correctamente", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
    
});

    // GET de usuarios

router.get('/', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();
        
        // Check if users exist
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No se encontraron Usuarios" });
        }

        // Return the users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put('/deactivate/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the 'active' property to false
        user.active = false;
        await user.save();

        res.status(200).json({ message: "User deactivated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Route to activate a user
router.put('/activate/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the 'active' property to true
        user.active = true;
        await user.save();

        res.status(200).json({ message: "User activated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put('/approve/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the 'approved' property to true
        user.approved = true;
        await user.save();

        res.status(200).json({ message: "User approved successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Route to reject a user registration
router.put('/reject/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the 'approved' property to false
        user.approved = false;
        await user.save();

        res.status(200).json({ message: "User rejected successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;


