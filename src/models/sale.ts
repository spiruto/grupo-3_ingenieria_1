let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const saleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Referencia al vendedo
},{
    timestamps: true // Genera automáticamente campos createdAt y updatedAt
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;