const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// only vendors can access
router.get('/dashboard', protect, authorizeRoles('vendor'), (req, res) => {
    res.json({
        message: "Welcome Vendor Dashboard",
        vendor: req.user.name
    });
});

module.exports = router;
