const Inventory = require('../models/Inventory');


// Vendor adds today's stock
const addInventory = async (req, res) => {
    try {

        const { productId, pricePerKg, availableQty } = req.body;

        const today = new Date();
        today.setHours(0,0,0,0);

        // prevent duplicate entry same day
        const existing = await Inventory.findOne({
            product: productId,
            vendor: req.user._id,
            date: today
        });

        if (existing) {
            return res.status(400).json({ message: "Inventory already added for today" });
        }

        const inventory = await Inventory.create({
            product: productId,
            vendor: req.user._id,
            date: today,
            pricePerKg,
            availableQty
        });

        res.status(201).json(inventory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Customer sees today's available vegetables
const getTodayInventory = async (req, res) => {
    try {

        const today = new Date();
        today.setHours(0,0,0,0);

        const inventory = await Inventory.find({ date: today })
            .populate('product', 'name image')
            .populate('vendor', 'name');

        res.json(inventory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addInventory,
    getTodayInventory
};
