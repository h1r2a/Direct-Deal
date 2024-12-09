const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password :{
        type : String,
        requried : true
    },
    role :{
        type : String,
        enum :process.env.ALLOWED_ROLES.split(','),
    }
}, { timestamps: true });

const User = mongoose.model('User',UserSchema);

module.exports = User;