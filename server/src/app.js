const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vendorOrderRoutes = require('./routes/vendorOrderRoutes');

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());   // VERY IMPORTANT: must be before routes

/* ---------------- ROUTES ---------------- */

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vendor', vendorOrderRoutes);


/* ---------------- HEALTH CHECK ---------------- */

app.get('/', (req, res) => {
    res.send('SabjiWala API Running 🚀');
});

/* ---------------- 404 HANDLER (LAST) ---------------- */

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;
