import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());//allows us to accept json data in the req.body

//POSTMAN TEST instead of frontend
console.log(process.env.MONGO_URI);//check if the connection is successful''

app.use('/api/products',productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 5000 at http://localhost:' + PORT);
 });
