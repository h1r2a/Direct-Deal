const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');
const uploadProduct = require('../middlewares/upload');
const productMiddleWare = require('../middlewares/productMiddleware');

// Route pour créer un produit
router.post('/create', authenticateToken('PM'), productController.createProduct);

// Route pour uploader un fichier pour un produit existant
router.post('/upload/:id', 
    authenticateToken('PM'), 
    productMiddleWare.checkIfproductExists, 
    uploadProduct.single('file'), 
    productController.saveMetaData
);

// Route pour récupérer tous les produits (sans pagination)
router.get('', productController.getAllProducts);

// Route pour récupérer les produits avec pagination
router.get('/paginated', productController.getPaginatedProducts);

router.get('/search', productController.searchProductByName);


module.exports = router;
