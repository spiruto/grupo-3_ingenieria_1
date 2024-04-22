let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;