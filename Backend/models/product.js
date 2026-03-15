const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  eng_name: { type: String, required: true },
  mar_name: { type: String, required: true },
  img: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  eng_description: { type: String, required: false },
  mar_description: { type: String, required: false },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tag: [{ type: String }],
  visible: {
    type: Boolean,
    default: true
  },
  price: { type: Number },
}, { timestamps: true });

const validateProductModel = (data) => {
  const schema = Joi.object({
    eng_name: Joi.string().min(3).max(100).required(),
    mar_name: Joi.string().min(3).max(100).required(),
    img: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          public_id: Joi.string().required(),
          type: Joi.string()
            .pattern(/^image\/.+$/)
            .required(),
        })
      )
      .min(1)
      .required(),
    visible: Joi.boolean().default(true),   // ✅ Fixed: added default value + comma
    eng_description: Joi.string().allow("").optional(),
    mar_description: Joi.string().allow("").optional(),
    category: Joi.string().hex().length(24).required(),
    tag: Joi.array().items(Joi.string()).optional(),
    price: Joi.number().min(0).optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel, validateProductModel };