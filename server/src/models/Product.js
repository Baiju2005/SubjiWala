const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
