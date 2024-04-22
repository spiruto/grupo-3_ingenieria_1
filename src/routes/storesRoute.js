const express = require('express');
const Store = require('../models/store.ts'); // Assuming the path to the model file is correct
const router = express.Router();
// Route to create a new store (Create operation)
router.post('/', async (req, res) => {
    try {
        const { name, address, city, phoneNumber, email } = req.body;
        const newStore = new Store({ name, address, city, phoneNumber, email });
        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all stores (Read operation)
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get a specific store by ID (Read operation)
router.get('/:storeId', async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/name/:name', async (req, res) => {
    try {
        const filteredStores = await Store.find({ name: { $regex: new RegExp(req.params.name, 'i') } }); // Case-insensitive search
        res.json(filteredStores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to update a store by ID (Update operation)
router.put('/:storeId', async (req, res) => {
    try {
        const updatedStore = await Store.findByIdAndUpdate(req.params.storeId, req.body, { new: true });
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(updatedStore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to delete a store by ID (Delete operation)
router.delete('/:storeId', async (req, res) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.storeId);
        if (!deletedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;