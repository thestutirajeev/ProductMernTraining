import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());//allows us to accept json data in the req.body

app.post('/api/products', async(req, res) => {
    const product = req.body;// user will send the product
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({error: 'All fields are required'});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error('Error: in create product', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 at http://localhost:5000');
});
