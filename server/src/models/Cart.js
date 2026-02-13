const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    weight: Number,      // in kg
    price: Number        // calculated using inventory
});

const cartSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    items: [cartItemSchema],

    totalAmount: {
        type: Number,
        default: 0
    }

},
{ timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
