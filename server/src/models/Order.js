const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    weight: Number,   // in KG (0.25, 0.5, 1)
    price: Number     // calculated price
});

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [orderItemSchema],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['placed','accepted','packed','out_for_delivery','delivered','cancelled'],
        default: 'placed'
    }

},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
