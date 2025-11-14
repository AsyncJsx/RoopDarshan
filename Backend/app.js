const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');

const adminRoutes = require('./router/admin.routes');
const categoryRoutes = require('./router/category.routes');
const productRoutes = require('./router/product.routes');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://roop-darshan.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


db();

app.use('/admin',adminRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);


// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
