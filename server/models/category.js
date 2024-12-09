const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, code: {
        type: String,
        unique: true,
        required: true
    }

}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;