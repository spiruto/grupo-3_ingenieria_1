const express = require('express');
const router = express.Router();
const PaymentMethod = require('../models/paymentMethod.ts');

// GET: Obtener todos los métodos de pago
router.get('/', async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.json(paymentMethods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Agregar un nuevo método de pago
router.post('/', async (req, res) => {
    try {
        const { name, description, cardNumber, expirationDate, cvv } = req.body;
        const newPaymentMethod = new PaymentMethod({ name, description, cardNumber, expirationDate, cvv });
        const savedPaymentMethod = await newPaymentMethod.save();
        res.status(201).json(savedPaymentMethod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Actualizar un método de pago por su ID
router.put('/:id', async (req, res) => {
    try {
        const { name, description, cardNumber, expirationDate, cvv } = req.body;
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, { name, description, cardNumber, expirationDate, cvv }, { new: true });
        res.json(updatedPaymentMethod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE: Eliminar un método de pago por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payment method deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
