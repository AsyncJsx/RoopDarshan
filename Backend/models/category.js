const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    eng_name: {
        type: String,
        required: [true, "English category name is required."]
    },
    visible :{
        type : Boolean,
        default : true
    },
    mar_name: {
        type: String,
        required: [true, "Marathi category name is required."]
    },
    eng_description: {
        type: String,
        required: [true, "English category description is required."]
    },
    mar_description: {
        type: String,
        required: [true, "Marathi category description is required."]
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: []
        }
    ],
    image: {
        url: { 
            type: String, 
            required: true 
        },
        public_id: { 
            type: String, 
            required: true 
        },
    },
}, { timestamps: true });

const validateCategoryModel = (data) => {
    const schema = Joi.object({
        eng_name: Joi.string().min(3).max(100).required(),
        mar_name: Joi.string().min(3).max(100).required(),
        eng_description: Joi.string().min(10).max(500).required(),
        mar_description: Joi.string().min(10).max(500).required(),
        visible: Joi.boolean().default(true),
        image: Joi.object({
            url: Joi.string().uri().required().messages({
                'string.uri': 'Image URL must be a valid URI',
                'any.required': 'Image URL is required'
            }),
            public_id: Joi.string().required().messages({
                'any.required': 'Image public ID is required'
            })
        }).required().messages({
            'any.required': 'Image object is required'
        })
    });

    return schema.validate(data, { abortEarly: false });
};

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel, validateCategoryModel };