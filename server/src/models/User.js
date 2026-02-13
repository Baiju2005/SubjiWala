const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['customer', 'vendor', 'admin'],
            default: 'customer'
        },

        pincode: {
            type: String
        },

        // vendor must be approved by admin
        isApproved: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
