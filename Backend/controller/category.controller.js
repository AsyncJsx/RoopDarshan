const categoryService = require('../service/category.service');
const { CategoryModel, validateCategoryModel } = require('../models/category');
const {cloudinary,deleteFromCloudinary} = require('../config/cloudinary');
const { findAdminById} = require('../service/admin.service')
const { comparePassword} = require('../utils/hash-password');
const createController = async (req, res) => {
  try {
    const imageData = req.optimizedImages ? req.optimizedImages[0] : null; // Access first element
   
    if (!imageData) {
      return res.status(400).json({ error: "Category image is required" });
    }

    const categoryData = {
      ...req.body,
      image: {
        url: imageData.url,
        public_id: imageData.public_id
      }
    };

    const { error } = validateCategoryModel(categoryData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.createCategoryService(categoryData);

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
    const updateData = { ...req.body };

    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Check if user wants to keep existing image or replace it
    const keepExistingImage = req.body.keepExistingImage === 'true';

    if (req.optimizedImages && req.optimizedImages.length > 0) {
      // Delete old image from Cloudinary if it exists
      if (category.image && category.image.public_id) {
        try {
          await cloudinary.uploader.destroy(category.image.public_id);
          console.log("✅ Deleted old category image from Cloudinary:", category.image.public_id);
        } catch (err) {
          console.warn("⚠️ Failed to delete old image:", category.image.public_id, err.message);
        }
      }

      // Use the new uploaded image
      updateData.image = {
        url: req.optimizedImages[0].url,
        public_id: req.optimizedImages[0].public_id
      };
    } else if (!keepExistingImage) {
      // If user explicitly wants to remove image (though schema requires it, so this might not apply)
      // This would need schema changes to make image optional for updates
      updateData.image = category.image; // Keep existing as fallback
    } else {
      // Keep existing image
      updateData.image = category.image;
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
    const { password } = req.body;

    // find admin
    const admin = await findAdminById(req.admin._id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // compare password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // find category
    const category = await categoryService.findCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // delete category
    await categoryService.deleteCategoryById(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: error.message,
    });
  }
};

const getLastUpdatedController = async (req, res) => {
  try {
   
    const lastUpdated = await categoryService.getLastUpdatedService();
    res.json({ lastUpdated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch last updated timestamp" });
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
  getProductsController,
  getLastUpdatedController
};
