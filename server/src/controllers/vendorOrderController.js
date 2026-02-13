const Order = require('../models/Order');

// vendor sees orders belonging to him
const getVendorOrders = async (req, res) => {
    try {

        const vendorId = req.user._id;

        const orders = await Order.find({
            "items.vendor": vendorId
        })
        .populate('user', 'name phone')
        .populate('items.product', 'name image');

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;
        const orderId = req.params.id;

        const allowedStatus = [
            'accepted',
            'packed',
            'out_for_delivery',
            'delivered',
            'cancelled'
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // check this vendor actually owns at least one item
        const vendorOwnsOrder = order.items.some(
            item => item.vendor.toString() === req.user._id.toString()
        );

        if (!vendorOwnsOrder) {
            return res.status(403).json({ message: "Not your order" });
        }

        order.status = status;
        await order.save();

        res.json({
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVendorOrders, updateOrderStatus };
