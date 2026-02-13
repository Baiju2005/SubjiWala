const Cart = require('../models/Cart');
const Inventory = require('../models/Inventory');


// ADD ITEM TO CART
const addToCart = async (req, res) => {
    try {

        const { productId, weight } = req.body;

        const today = new Date();
        today.setHours(0,0,0,0);

        const inventory = await Inventory.findOne({
            product: productId,
            date: today
        });

        if (!inventory) {
            return res.status(400).json({ message: "Product not available today" });
        }

        const price = inventory.pricePerKg * weight;

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [],
                totalAmount: 0
            });
        }

        // check if already exists
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.weight += weight;
            existingItem.price += price;
        } else {
            cart.items.push({ product: productId, weight, price });
        }

        // recalculate total
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price, 0);

        await cart.save();

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET MY CART
const getMyCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product', 'name image');

    res.json(cart || { items: [], totalAmount: 0 });
};


// CLEAR CART
const clearCart = async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
};

module.exports = { addToCart, getMyCart, clearCart };
