const { CategoryModel } = require('../models/category');

const createCategoryService = async (data) => {
    const { eng_name, mar_name, eng_description, mar_description, products, image } = data;
    
    if (!eng_name || !mar_name || !eng_description || !mar_description || !image) {
        throw new Error('All fields are required');
    }

    if (!image.url || !image.public_id) {
        throw new Error('Image URL and public ID are required');
    }

    try {
        // ✅ new category goes to the bottom
        const last = await CategoryModel.findOne().sort({ order: -1 }).select('order');
        const nextOrder = last ? last.order + 1 : 0;

        const category = await CategoryModel.create({
            eng_name,
            mar_name,
            eng_description,
            mar_description,
            products,
            image,
            order: nextOrder
        });
        return category;
    } catch (err) {
        throw new Error('Error creating category: ' + err.message);
    }
};

const getLastUpdatedService = async () => {
    const latestCategory = await CategoryModel.findOne()
        .sort({ updatedAt: -1 })
        .select("updatedAt")
        .lean();
    return latestCategory ? latestCategory.updatedAt : new Date(0);
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
        const categories = await CategoryModel.find()
            .populate("products")
            .sort({ order: 1 }); // ✅ sort by order
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

const setVisibility = async (id) => {
    const category = await CategoryModel.findById(id);
    if (!category) return null;
  
    if (category.visible === undefined) {
        category.visible = false;
    } else {
        category.visible = !category.visible;
    }
  
    await category.save();
    return category;
};

// ✅ bulk reorder service
const bulkReorderCategoryService = async (orderedIds) => {
    const bulkOps = orderedIds.map((id, index) => ({
        updateOne: {
            filter: { _id: id },
            update: { $set: { order: index } }
        }
    }));
    await CategoryModel.bulkWrite(bulkOps);
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
    deleteCategoryByName,
    getLastUpdatedService,
    setVisibility,
    bulkReorderCategoryService, // ✅ added
};