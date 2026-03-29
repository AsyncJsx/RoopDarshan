const { ProductModel, validateProductModel } = require('../models/product');
const productService = require('../service/product.service');
const categoryService = require('../service/category.service');
const {cloudinary,deleteFromCloudinary} = require('../config/cloudinary');

const createController = async (req, res) => {
  try {
   
    const imageData = req.optimizedImages || [];

    const productData = {
      ...req.body,
      img: imageData,
    };
    
    // 🧩 Normalize tag to array
    if (productData.tag && !Array.isArray(productData.tag)) {
      productData.tag = [productData.tag];
    }
    const { error } = validateProductModel(productData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await productService.createProductService(productData);

    const category = await categoryService.addProductToCategory(
      product.category,
      product._id
    );

    res.status(201).json({
      message: "✅ Product created successfully",
      product,
      category,
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ error: "Error creating product" });
  }
};

const toggleVisibilityController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productService.toggleProductVisibilityService(id);

    res.status(200).json({
      message: result.message,
      product: {
        id: result.id,
        visible: result.visible,
      },
    });
  } catch (err) {
    console.error("❌ Error toggling product visibility:", err);
    res.status(500).json({ error: err.message });
  }
};


const editController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle tags - if it's coming as array from form-data
    if (req.body.tag) {
      updateData.tag = Array.isArray(req.body.tag) ? req.body.tag : [req.body.tag];
    }

    const product = await productService.findProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Get existing images that should be kept
    const existingImagesToKeep = req.body.existingImages ? 
      (Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages]) : [];

    // Find images to delete (images that were in product but not in kept list)
    const imagesToDelete = product.img.filter(oldImage => 
      !existingImagesToKeep.includes(oldImage.url)
    );

    // Delete removed images from Cloudinary
    if (imagesToDelete.length > 0) {
      for (const image of imagesToDelete) {
        if (image.public_id) {
          try {
            await cloudinary.uploader.destroy(image.public_id);
            console.log("✅ Deleted from Cloudinary:", image.public_id);
          } catch (err) {
            console.warn("⚠️ Failed to delete image:", image.public_id, err.message);
          }
        }
      }
    }

    // Combine kept existing images with new optimized images
    const keptExistingImages = product.img.filter(oldImage => 
      existingImagesToKeep.includes(oldImage.url)
    );

    if (req.optimizedImages && req.optimizedImages.length > 0) {
      updateData.img = [...keptExistingImages, ...req.optimizedImages];
    } else {
      updateData.img = keptExistingImages;
    }

    const updatedProduct = await productService.updateProductById(id, updateData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};
const bulkDeleteController = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    for (const id of ids) {
      // 1️⃣ Find product
      const product = await productService.findProductById(id);
      if (!product) continue; // skip if not found, don't break the whole loop

      // 2️⃣ Delete images from Cloudinary
      if (product.img && product.img.length > 0) {
        for (const image of product.img) {
          if (image.public_id) {
            await deleteFromCloudinary(image.public_id);
          }
        }
      }

      // 3️⃣ Remove from category
      await categoryService.removeProductFromCategory(product.category, id);

      // 4️⃣ Delete product
      await productService.deleteProductById(id);
    }

    return res.status(200).json({
      success: true,
      message: `${ids.length} products deleted successfully`,
    });

  } catch (error) {
    console.error("Error bulk deleting products:", error);
    return res.status(500).json({
      success: false,
      message: "Error bulk deleting products",
      error: error.message,
    });
  }
};
const deleteController = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 1️⃣ Find the product first
      const product = await productService.findProductById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      // 2️⃣ Delete images from Cloudinary
      if (product.img && product.img.length > 0) {
        for (const image of product.img) {
          if (image.public_id) {
            await deleteFromCloudinary(image.public_id);
          }
        }
      }
      
      await categoryService.removeProductFromCategory(product.category,id);
      await productService.deleteProductById(id);
  
      return res.status(200).json({
        success: true,
        message: "Product and its images deleted successfully",
      });
  
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
    }
};

const getController = async (req,res)=>{
  try {
    const {id} = req.params;
    const product = await productService.findProductById(id);
    if(!product){
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product, message: "Product found successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Product not found",error:error.message });
  }
}

const getDataController = async (req,res)=>{
  try {
    const {id} = req.params;
    const product = await productService.findProductByIdWithCategory(id);
    if(!product){
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(404).json({ success: true,product, message: "Product found Successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Product not found",error:error.message });
  }
}
// status code correct
const getAllProductsController = async (req,res)=>{
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({ success: true,products, message: "Products found Successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Products not found",error:error.message });
  }
}

const searchProductsController = async (req, res) => {
  try {
    const { q, category, tags, minPrice, maxPrice, sortBy, page = 1, limit = 12 } = req.query;
    
    const searchCriteria = {
      query: q,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy,
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const searchResults = await productService.searchProductsService(searchCriteria);
    
    res.status(200).json({
      success: true,
      message: "Products found successfully",
      ...searchResults
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error searching products", 
      error: error.message 
    });
  }
};

const fuzzySearchController = async (req, res) => {
  try {
    const { q, limit = 24 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search term must be at least 2 characters long"
      });
    }

    const matchedProducts = await productService.fuzzySearchService(q, parseInt(limit));
    
    res.status(200).json({
      success: true,
      message: "Fuzzy search completed successfully",
      products: matchedProducts,
      searchTerm: q,
      totalMatches: matchedProducts.length
    });
  } catch (error) {
    console.error("Error in fuzzy search:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error in fuzzy search", 
      error: error.message 
    });
  }
};

module.exports = {createController,editController,deleteController,getController,getDataController,getAllProductsController,searchProductsController,fuzzySearchController ,toggleVisibilityController ,bulkDeleteController};  