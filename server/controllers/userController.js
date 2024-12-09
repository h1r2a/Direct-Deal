const bcrypt = require('bcrypt');
const User = require('../models/user');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();

const userController = {


    createUser: async (req, res) => {
        const { userName, password, role } = req.body;
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(500).json({ message: 'username is already taken' });
        }

        const roles = process.env.ALLOWED_ROLES.split(',')
        if (!roles.includes(role)) {
            return res.status(500).json({ message: 'This role is invalid' });
        }
        try {
            const hashedPassword = await bcrypt.hash( password, 10);
            const newUser = new User({
                userName, password: hashedPassword, role
            });

            await newUser.save();

            return res.status(200).json({ message: `The ${newUser.role} : ${newUser.userName} has been created successfully` });
        } catch (error) {
            return res.status(500).json(error);
        }
    },



    login: async (req, res) => {
        const { userName, password } = req.body;
        try {
            const user = await User.findOne({ userName });
            if (!user) { return res.status(400).json({ message: "Invalid username" }) }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) { return res.status(400).json({ message: "Invalid password" }) }

            const payload = { userId: user._id, userName: user.userName, role: user.role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
            return res.status(200).json(token)

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = userController;