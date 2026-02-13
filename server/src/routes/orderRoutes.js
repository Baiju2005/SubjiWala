const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { placeOrder, getMyOrders } = require('../controllers/orderController');

router.post('/', protect, placeOrder);
router.get('/my', protect, getMyOrders);

// TEST ROUTE
router.get('/test', (req, res) => {
    res.send("ORDER ROUTE WORKING");
});

console.log("Routes inside orderRoutes registered");

module.exports = router;
