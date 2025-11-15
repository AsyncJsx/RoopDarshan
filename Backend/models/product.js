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
  eng_description: { type: String, required: true },
  mar_description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tag: [{ type: String }],
  price: { type: Number }, // Optional field
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
            .pattern(/^image\/.+$/) // ✅ Accepts all image MIME types (image/png, image/jpeg, etc.)
            .required(),
        })
      )
      .min(1)
      .required(),
    eng_description: Joi.string().min(10).max(500).optional(),
    mar_description: Joi.string().min(10).max(500).optional(),
    category: Joi.string().hex().length(24).required(),
    tag: Joi.array().items(Joi.string()).optional(),
    price: Joi.number().min(0).optional(), // Optional validation
  });

  return schema.validate(data, { abortEarly: false });
};

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel, validateProductModel };