const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

// GET: Obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().populate('product').populate('user').populate('store');
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Agregar una nueva venta
router.post('/', async (req, res) => {
    try {
        const { product, quantity, totalPrice, user, store } = req.body;
        const newSale = new Sale({ product, quantity, totalPrice, user, store });
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Actualizar una venta por su ID
router.put('/:id', async (req, res) => {
    try {
        const { quantity, totalPrice } = req.body;
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, { quantity, totalPrice }, { new: true });
        res.json(updatedSale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Eliminar una venta por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
