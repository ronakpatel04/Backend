
const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    manufacturingDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    }
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;
