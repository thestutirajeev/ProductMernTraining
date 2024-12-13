import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import productRoutes from './routes/product.routes.js';  

dotenv.config();

const app = express(); 

app.use(express.json());//allows us to accept json data in the req.body

//POSTMAN TEST instead of frontend
console.log(process.env.MONGO_URI);//check if the connection is successful
app.use('/api/products',productRoutes);
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000 at http://localhost:5000');
 });
