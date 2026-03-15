// scripts/initCategoryOrder.js
const mongoose = require('mongoose');
const { CategoryModel } = require('../models/category');
require('dotenv').config();

const initOrder = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const categories = await CategoryModel.find().sort({ createdAt: 1 }); // oldest first

    const bulkOps = categories.map((cat, index) => ({
        updateOne: {
            filter: { _id: cat._id },
            update: { $set: { order: index } }
        }
    }));

    await CategoryModel.bulkWrite(bulkOps);
    console.log(`✅ Initialized order for ${categories.length} categories`);

    await mongoose.disconnect();
};

initOrder().catch(console.error);