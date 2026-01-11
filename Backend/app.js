const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');





// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_LINK],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


db();

app.use('/admin', (req,res,next)=> {
    const adminRoutes = require('./router/admin.routes');
    adminRoutes(req,res,next);
});

app.use('/category',(req,res,next)=>{
    const categoryRoutes = require('./router/category.routes');
    categoryRoutes});
app.use('/product',(req,res,next)=>{
    const productRoutes = require('./router/product.routes');
    productRoutes});


app.get('/awake',async (req,res)=>{
    res.send("awaked")
})

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
