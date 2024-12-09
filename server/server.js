const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require('./routes/userRoute')
const catRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
const orderRouter=require('./routes/orderRoute')
dotenv.config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users',userRouter);
app.use('/api/categories',catRouter);
app.use('/api/products',productRouter);
app.use('/api/order',orderRouter);





app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
