const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const { addInventory, getTodayInventory } = require('../controllers/inventoryController');


// vendor uploads daily stock
router.post('/', protect, authorizeRoles('vendor'), addInventory);

// customers view today's vegetables
router.get('/today', getTodayInventory);

module.exports = router;
