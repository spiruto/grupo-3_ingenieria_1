let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;