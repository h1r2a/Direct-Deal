const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');
const orderController = require('../controllers/orderController');


router.post('/checkout',authenticateToken('Cashier'),orderController.checkout);

module.exports = router;