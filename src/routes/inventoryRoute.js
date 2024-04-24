const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory.ts');

// GET: Obtener todos los registros de inventario
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('store').populate('product').populate('seller');
        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Agregar un nuevo registro de inventario
router.post('/', async (req, res) => {
    try {
        const { seller, product, quantity } = req.body;
        const newInventoryItem = new Inventory({ seller, product, quantity });
        const savedItem = await newInventoryItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Actualizar la cantidad de un producto en el inventario de una tienda
router.put('/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Eliminar un registro de inventario
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/store/:idstore', async (req, res) => {
    try {
        let idstore = req.params.idstore;
        const findInventories = await Inventory.find({ store: idstore}).populate("product").exec();
        res.json(findInventories);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;