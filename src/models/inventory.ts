let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // Referencia al ID de la tienda
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al ID del producto
    quantity: { type: Number, required: true }, // Cantidad del producto en la tienda
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al vendedor
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;