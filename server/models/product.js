const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required : true
    },
    imageName : {
        type : String,
    }
},{timestamps:true});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;