
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const paymentMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true }
});

// Crear y exportar el modelo del método de pago
const paymentMethod = mongoose.model('paymentMethod', paymentMethodSchema);

module.exports = paymentMethod;