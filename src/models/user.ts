let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nationalId: { type: String, required: true, unique: true },
    nationalIdType: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    profileImage: { type: Buffer },
    paymentMethod: { type: String},
    userType: { type: String, default: "Cliente"},
    permitPDF: { type: Buffer }
});

module.exports = mongoose.model('User', userSchema);