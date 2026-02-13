const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Cart = require('../models/Cart');



// PLACE ORDER
// const placeOrder = async (req, res) => {
//     try {

//         const { items } = req.body;
//         let totalAmount = 0;
//         let orderItems = [];

//         const today = new Date();
//         today.setHours(0,0,0,0);

//         for (let item of items) {

//             // find today's inventory
//             const inventory = await Inventory.findOne({
//                 product: item.productId,
//                 date: today
//             });

//             if (!inventory) {
//                 return res.status(400).json({ message: "Product not available today" });
//             }

//             // calculate price
//             const price = inventory.pricePerKg * item.weight;

//             // stock check
//             if (inventory.availableQty < item.weight) {
//                 return res.status(400).json({ message: "Not enough stock" });
//             }

//             // reduce stock
//             inventory.availableQty -= item.weight;
//             inventory.soldQty += item.weight;
//             await inventory.save();

//             totalAmount += price;

//             orderItems.push({
//                 product: inventory.product,
//                 vendor: inventory.vendor,
//                 weight: item.weight,
//                 price
//             });
//         }

//         const order = await Order.create({
//             user: req.user._id,
//             items: orderItems,
//             totalAmount
//         });

//         res.status(201).json(order);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const placeOrder = async (req, res) => {
    try {

        // find user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        let totalAmount = 0;
        let orderItems = [];

        for (let item of cart.items) {

            // get today's inventory
            const inventory = await Inventory.findOne({
                product: item.product,
                date: today
            });

            if (!inventory) {
                return res.status(400).json({ message: "Some items are not available today" });
            }

            // stock check
            if (inventory.availableQty < item.weight) {
                return res.status(400).json({
                    message: `Not enough stock for product ${item.product}`
                });
            }

            // deduct stock
            inventory.availableQty -= item.weight;
            inventory.soldQty += item.weight;
            await inventory.save();

            totalAmount += item.price;

            orderItems.push({
                product: item.product,
                vendor: inventory.vendor,
                weight: item.weight,
                price: item.price
            });
        }

        // create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });

        // clear cart AFTER successful order
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// USER ORDER HISTORY
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate('items.product', 'name image');

    res.json(orders);
};

module.exports = { placeOrder, getMyOrders };
