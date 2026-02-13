const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const {getVendorOrders,updateOrderStatus} = require('../controllers/vendorOrderController');

// vendor sees his orders
router.get('/orders', protect, authorizeRoles('vendor'), getVendorOrders);

// update order status
router.put('/orders/:id', protect, authorizeRoles('vendor'), updateOrderStatus);

module.exports = router;
