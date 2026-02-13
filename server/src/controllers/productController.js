const Product = require('../models/Product');


// ADD PRODUCT (VENDOR ONLY)
// const addProduct = async (req, res) => {
//     try {
//         const { name, description, category, image } = req.body;

//         const product = await Product.create({
//             name,
//             description,
//             category,
//             image,
//             vendor: req.user._id
//         });

//         res.status(201).json(product);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



const addProduct = async (req, res) => {
    try {

        // Debug log (temporary)
        console.log(req.body);
        console.log(req.file);

        const name = req.body?.name;
        const description = req.body?.description;
        const category = req.body?.category;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const imageUrl = req.file ? req.file.path : "";

        const product = await Product.create({
            name,
            description,
            category,
            image: imageUrl,
            vendor: req.user._id
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// GET ALL PRODUCTS (PUBLIC)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .populate('vendor', 'name');

        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET VENDOR PRODUCTS
const getVendorProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getVendorProducts
};
