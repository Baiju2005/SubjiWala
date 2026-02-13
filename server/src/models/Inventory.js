const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    pricePerKg: {
        type: Number,
        required: true
    },

    availableQty: {
        type: Number,
        required: true
    },

    soldQty: {
        type: Number,
        default: 0
    }

},
{ timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
