const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const OrderSchema = mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, require: true },
    paymentMethod: { type: String, enum: process.env.PAYEMENT_METHOD.split(',') },
    cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Completed' },
},{timestamps:true});

const Order = mongoose.model('Order' , OrderSchema);

module.exports = Order;
