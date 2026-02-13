const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const { addProduct, getProducts, getVendorProducts } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// vendor adds product
// router.post('/', protect, authorizeRoles('vendor'), addProduct);
router.post('/', protect, authorizeRoles('vendor'), upload.single('image'), addProduct);



// vendor sees his products
router.get('/my', protect, authorizeRoles('vendor'), getVendorProducts);

// public products
router.get('/', getProducts);

module.exports = router;
