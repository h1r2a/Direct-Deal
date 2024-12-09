const Order = require('../models/order')
const Product = require('../models/product')

const orderController = {
    checkout: async (req, res) => {
        const { products, paymentMethod } = req.body;
        let totalAmount = 0;
        try {
            for (let product of products) {
                const dbProduct = await Product.findById(product.id);
                if (!dbProduct) { return res.status(400).json({ message: 'Product Unfound' }) }
                if (dbProduct.quantity < product.quantity) { return res.status(503).json({ message: `Not enough stock for ${dbProduct.name}` }) }
                dbProduct.quantity -= product.quantity;
                await dbProduct.save();
                totalAmount += product.price * product.quantity;
            }
            const allowedMethods = process.env.PAYEMENT_METHOD.split(',');

            if (!allowedMethods.includes(paymentMethod)){return res.status(503).json({ message: 'payment method not allowed'})};

            const newOrder = new Order({
                products,
                totalAmount,
                paymentMethod,
                cashier: req.payload._id
            })

            await newOrder.save();

            return res.status(201).json({order:newOrder});

        } catch (error) {
            return res.status(503).json({error});
        }
    },
};

module.exports = orderController;