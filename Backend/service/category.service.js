const { CategoryModel } = require('../models/category');

const createCategoryService = async (data) => {
    const { eng_name, mar_name, eng_description, mar_description, products } = data;
    if (!eng_name || !mar_name || !eng_description || !mar_description) {
        throw new Error('All fields are required');
    }
    try {
        const category = await CategoryModel.create({
            eng_name,
            mar_name,
            eng_description,
            mar_description,
            products
        });
        return category;
    } catch (err) {
        throw new Error('Error creating category: ' + err.message);
    }
};

const findCategoryById = async (id) => {
    try {
        const category = await CategoryModel.findById(id).populate('products');
        return category;
    } catch (err) {
        throw new Error('Error finding category: ' + err.message);
    }
};

const findCategoryByName = async (eng_name) => {
    try {
        const category = await CategoryModel.findOne({ eng_name });
        return category;
    } catch (err) {
        throw new Error('Error finding category: ' + err.message);
    }
};

const getAllCategories = async () => {
    try {
        const categories = await CategoryModel.find().populate("products");
        return categories;
    } catch (err) {
        throw new Error('Error fetching categories: ' + err.message);
    }
};

const addProductToCategory = async (categoryId, productId) => {
    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new Error('Category not found');
        if (!category.products.includes(productId)) {
            category.products.push(productId);
            await category.save();
        }
        return category;
    } catch (err) {
        throw new Error('Error adding product: ' + err.message);
    }
};

const removeProductFromCategory = async (categoryId, productId) => {
    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new Error('Category not found');
        category.products = category.products.filter(id => id.toString() !== productId);
        await category.save();
        return category;
    } catch (err) {
        throw new Error('Error removing product: ' + err.message);
    }
};

const updateCategoryService = async (categoryId, updateData) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, updateData, { new: true });
        return updatedCategory;
    } catch (err) {
        throw new Error('Error updating category: ' + err.message);
    }
};

const deleteCategoryById = async (id) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(id);
        return category;
    } catch (err) {
        throw new Error('Error deleting category: ' + err.message);
    }
};

const deleteCategoryByName = async (eng_name) => {
    try {
        const category = await CategoryModel.findOneAndDelete({ eng_name });
        return category;
    } catch (err) {
        throw new Error('Error deleting category: ' + err.message);
    }
};

module.exports = {
    createCategoryService,
    findCategoryById,
    findCategoryByName,
    getAllCategories,
    addProductToCategory,
    removeProductFromCategory,
    updateCategoryService,
    deleteCategoryById,
    deleteCategoryByName
};
