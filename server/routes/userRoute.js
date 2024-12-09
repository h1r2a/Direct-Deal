const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');

router.post('/create',authenticateToken('Admin'),userController.createUser);
router.post('/login',userController.login);
router.post('/test',authenticateToken,(req,res)=>{
    return res.status(200).json({message:'vody'})
});


module.exports = router