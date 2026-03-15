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
    origin: ["http://localhost:5173", process.env.FRONTEND_LINK],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));


db();

app.use('/admin', (req, res, next) => {
    // Lazy load router only when route is accessed
    const adminRoutes = require('./router/admin.routes');
    adminRoutes.handle(req, res, next); // ✅ Use .handle to call router
});

app.use('/category', (req, res, next) => {
    const categoryRoutes = require('./router/category.routes');
    categoryRoutes.handle(req, res, next);
});

app.use('/product', (req, res, next) => {
    const productRoutes = require('./router/product.routes');
    productRoutes.handle(req, res, next);
});



app.get('/awake',async (req,res)=>{
    res.send("awaked")
})

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
