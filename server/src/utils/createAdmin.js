const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        // check if admin already exists
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("✅ Admin already exists");
            return;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        // create admin
        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            phone: process.env.ADMIN_PHONE,
            password: hashedPassword,
            role: 'admin',
            isApproved: true
        });

        console.log("🔥 Default Admin Created Successfully");

    } catch (error) {
        console.log("Admin creation error:", error.message);
    }
};

module.exports = createAdmin;
