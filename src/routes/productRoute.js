const express = require('express');
const router = express.Router();
const Product = require('../models/product.ts');

// GET: Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;
        const newProduct = new Product({ name, description, price, category, imageUrl });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, imageUrl }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
