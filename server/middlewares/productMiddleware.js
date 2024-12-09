const Product = require('../models/product');
const productMiddleWare = {
    checkIfproductExists: async (req, res,next) => {

        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
    
        try {
            const product = await Product.findById(productId);
            if(!product){
                return res.status(400).json({message:'Prodcut Unfound'})
            }
            next();
        } catch (error) {
            return res.status(500).json({error})

        }
    }
};

module.exports = productMiddleWare;