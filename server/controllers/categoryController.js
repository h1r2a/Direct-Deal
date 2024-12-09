const Category = require('../models/category');

const categoryController = {
    // Create a new category
    createCat: async (req, res) => {
        const { name, code } = req.body;

        try {
            // Check if a category with the same name or code already exists
            const categoryExists = await Category.findOne({ $or: [{ name }, { code }] });
            if (categoryExists) {
                return res.status(400).json({ message: "The code or name already exists in the database" });
            }

            // Create a new category if no duplicate found
            const newCat = new Category({ name, code });
            await newCat.save();
            return res.status(201).json({ message: "Category created successfully", category: newCat });
        } catch (error) {
            console.error(error);  // Log the error for debugging
            res.status(500).json({ message: "Server error", error });
        }
    },

    // Retrieve all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            return res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    // Retrieve a single category by ID
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    // Update a category by ID
    updateCategory: async (req, res) => {
        const { name, code } = req.body;

        try {
            // Check for existing category with same name or code (excluding current category)
            const categoryExists = await Category.findOne({ 
                _id: { $ne: req.params.id }, 
                $or: [{ name }, { code }] 
            });
            if (categoryExists) {
                return res.status(400).json({ message: "The code or name already exists in the database" });
            }

            // Update the category if no duplicates are found
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { name, code },
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    // Delete a category by ID
    deleteCategory: async (req, res) => {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
};

module.exports = categoryController;
