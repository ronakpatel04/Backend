const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true, 
    }
});

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;
