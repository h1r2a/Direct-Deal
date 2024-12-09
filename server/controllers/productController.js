const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');
const { resolveObjectURL } = require('buffer');
const productController = {
    createProduct: async (req, res) => {
        const { name, price, quantity, category } = req.body;
        try {

            const existingProduct = await Product.findOne({ name });

            if (existingProduct) {
                return res.status(400).json({ message: "The product with this name already exists in the database" });
            };
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({ message: "Invalid category ID" });
            }

            // Vérification de l'existence de la catégorie par ID
            const existingCategory = await Category.findById(category);

            if (!existingCategory) {
                return res.status(400).json({ message: "The specified category does not exist" });
            }

            const newProduct = new Product({
                name, price, quantity, category
            });

            await newProduct.save();

            return res.status(201).json({ message: "Product created successfully", product: newProduct });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    saveMetaData: async (req, res) => {
        try {

            const product = await Product.findById(req.params.id);

            product.imageName = req.file.filename;
            await product.save();
            res.status(200).json({ message: "File uploaded successfully", product });
        } catch (error) {
            return res.status(500).json({ message: 'Internal error' });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().populate('category', 'name');// On utilise `populate` pour récupérer les détails de la catégorie
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error", error });
        }
    },
    getPaginatedProducts: async (req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1; // Par défaut, page 1 si non spécifié
            const sortOrder = req.query.sortOrder || 'desc'; // Par défaut, tri décroissant

            const limit = 9;
            const totalProducts = await Product.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);
            const skip = (page - 1) * limit;

            const products = await Product.find()
                .populate('category', 'name')
                .sort({ createdAt: sortOrder === 'asc' ? 1 : -1 })
                .skip(skip)
                .limit(limit);

            res.status(200).json({
                products,
                currentPage: page,
                totalPages
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },


    searchProductByName: async (req, res) => {
        try {
            const { nameString } = req.query;
    
            if (!nameString) {
                return res.status(400).json({ message: "Please provide a nameString query parameter" });
            }
    
            // Utilisation d'une expression régulière pour effectuer une recherche partielle et insensible à la casse
            const products = await Product.find({ name: { $regex: nameString, $options: 'i' } })
                .populate('category', 'name');
    
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
    







}

module.exports = productController;