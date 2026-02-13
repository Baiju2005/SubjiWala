const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const { createCategory, getCategories } = require('../controllers/categoryController');


// Admin only
router.post('/', protect, authorizeRoles('admin'), createCategory);

// Public
router.get('/', getCategories);

module.exports = router;
