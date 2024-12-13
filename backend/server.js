import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express(); 

app.use(express.json());//allows us to accept json data in the req.body

//Get all products
app.get('/api/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error('Error: in get all products', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
});

//Create a product
app.post('/api/products', async(req, res) => {
    const product = req.body;// user will send the product
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: 'All fields are required'});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save(); // save the product to the database
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error('Error: in create product', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
});

//Update a product
app.put("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    try {
        await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: 'Product is updated'});
    } catch (error) {
        console.error('Error: in update product', error.message);
        res.status(404).json({success: false, message: 'Product not found'});
    }
});

//Delete a product
app.delete('/api/products/:id', async(req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product is deleted'});
    } catch (error) {
        console.error('Error: in delete product', error.message);
        res.status(404).json({success: false, message: 'Product not found'});
    }
});

//POSTMAN TEST instead of frontend
console.log(process.env.MONGO_URI);//check if the connection is successful


app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 at http://localhost:5000');
 });
