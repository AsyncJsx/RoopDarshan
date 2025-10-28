const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    eng_name: {
        type: String,
        required: [true, "English product name is required."]
    },
    mar_name: {
        type: String,
        required: [true, "Marathi product name is required."]
    },
    img: {
        type: [String],
        required: [true, "At least one product image is required."]
    },
    eng_description: {
        type: String,
        required: [true, "English description is required."]
    },
    mar_description: {
        type: String,
        required: [true, "Marathi description is required."]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required."]
    },
    price: {
        type: Number,
        required: [true, "Price is required."]
    }
}, { timestamps: true });

const validateProductModel = (data) => {
    const schema = Joi.object({
        eng_name: Joi.string().min(3).max(100).required(),
        mar_name: Joi.string().min(3).max(100).required(),
        img: Joi.array().items(Joi.string().uri()).required(),
        eng_description: Joi.string().min(10).max(500).required(),
        mar_description: Joi.string().min(10).max(500).required(),
        category: Joi.string().hex().length(24).required(),
        price: Joi.number().min(0).required()
    });

    return schema.validate(data, { abortEarly: false });
};

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel, validateProductModel };
