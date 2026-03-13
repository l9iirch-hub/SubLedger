const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subSchema);
