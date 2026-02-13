const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


// ---------------- REGISTER ----------------
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role, pincode } = req.body;

        // check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            pincode,
            isApproved: role === 'vendor' ? false : true
        });

        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(user),
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ---------------- LOGIN ----------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.role === 'vendor' && !user.isApproved) {
            return res.status(403).json({ message: "Vendor not approved by admin yet" });
        }

        res.json({
            message: "Login successful",
            token: generateToken(user),
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ⭐ IMPORTANT PART (THIS FIXES YOUR ERROR)
module.exports = {
    registerUser,
    loginUser
};
