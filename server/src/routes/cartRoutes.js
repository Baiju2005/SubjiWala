const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { addToCart, getMyCart, clearCart } = require('../controllers/cartController');

router.post('/add', protect, addToCart);
router.get('/', protect, getMyCart);
router.delete('/clear', protect, clearCart);

module.exports = router;
