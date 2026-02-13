const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const User = require('../models/User');


// GET all pending vendors
router.get('/vendors/pending', protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor', isApproved: false });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// APPROVE vendor
router.put('/vendors/approve/:id', protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const vendor = await User.findById(req.params.id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        vendor.isApproved = true;
        await vendor.save();

        res.json({ message: "Vendor approved successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
