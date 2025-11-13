const categoryService = require('../service/category.service');
const { CategoryModel, validateCategoryModel } = require('../models/category');

const createController = async (req, res) => {
  try {
  
    const { error } = validateCategoryModel(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.createCategoryService(req.body)

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ error: "Error creating category" });
  }
};

  

const editController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const updatedCategory = await categoryService.updateCategoryService(id, updateData);

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
};

const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await categoryService.deleteCategoryById(id);
    return res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
};

const findController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
};

const getAllController = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

const getProductsController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, products: category.products });
  } catch (error) {
    console.error('Error fetching products from category:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

module.exports = {
  createController,
  editController,
  deleteController,
  findController,
  getAllController,
  getProductsController
};
