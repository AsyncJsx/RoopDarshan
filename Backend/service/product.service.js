const { ProductModel } = require('../models/product.model');

const createProductService = async (data) => {
    const { eng_name, mar_name, img, eng_description, mar_description, category, price } = data;

    if (!eng_name || !mar_name || !img || !eng_description || !mar_description || !category || !price) {
        throw new Error('All fields are required');
    }

    try {
        const product = await ProductModel.create({
            eng_name,
            mar_name,
            img,
            eng_description,
            mar_description,
            category,
            price
        });
        return product;
    } catch (err) {
        throw new Error('Error creating product: ' + err.message);
    }
};

const findProductById = async (id) => {
    try {
        const product = await ProductModel.findById(id).populate('category');
        return product;
    } catch (err) {
        throw new Error('Error finding product by ID: ' + err.message);
    }
};

const findProductByName = async (eng_name) => {
    try {
        const product = await ProductModel.findOne({ eng_name }).populate('category');
        return product;
    } catch (err) {
        throw new Error('Error finding product by name: ' + err.message);
    }
};

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find().populate('category');
        return products;
    } catch (err) {
        throw new Error('Error fetching products: ' + err.message);
    }
};

const updateProductById = async (productId, updateData) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        return updatedProduct;
    } catch (err) {
        throw new Error('Error updating product: ' + err.message);
    }
};

const deleteProductByName = async (eng_name) => {
    try {
        const product = await ProductModel.findOneAndDelete({ eng_name });
        return product;
    } catch (err) {
        throw new Error('Error deleting product: ' + err.message);
    }
};

module.exports = {
    createProductService,
    findProductById,
    findProductByName,
    getAllProducts,
    updateProductById,
    deleteProductByName
};
