const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');

router.post('/create',authenticateToken("PM"),categoryController.createCat);

router.get('/', categoryController.getAllCategories);

router.get('/:id', authenticateToken('PM'), categoryController.getCategoryById);

router.put('/update/:id', authenticateToken('PM'), categoryController.updateCategory);

router.delete('/delete/:id', authenticateToken('Admin'), categoryController.deleteCategory);

module.exports = router;