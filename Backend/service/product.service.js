const { ProductModel } = require('../models/product');

const createProductService = async (data) => {
    const { eng_name, mar_name, img, eng_description, mar_description, category,tag} = data;

    if (!eng_name || !mar_name || !img ||  !category ) {
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
            tag
        });
        return product;
    } catch (err) {
        console.log(err);
        throw new Error('Error creating product: ' + err.message);
    }
};


const toggleProductVisibilityService = async (productId) => {
  if (!productId) {
      throw new Error('Product ID is required');
  }

  try {
      const product = await ProductModel.findById(productId);

      if (!product) {
          throw new Error('Product not found');
      }

      product.visible = !product.visible;
      await product.save();

      return {
          id: product._id,
          visible: product.visible,
          message: `Product is now ${product.visible ? 'visible' : 'hidden'}`,
      };
  } catch (err) {
      throw new Error('Error toggling product visibility: ' + err.message);
  }
};


const findProductById = async (id) => {
    try {
        const product = await ProductModel.findById(id);
        return product;
    } catch (err) {
        throw new Error('Error finding product by ID: ' + err.message);
    }
};
const findProductByIdWithCategory = async (id) => {
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
const deleteProductById = async (id) => {
    try {
        const product = await ProductModel.findByIdAndDelete(id);
        return product;
    } catch (err) {
        throw new Error('Error deleting product: ' + err.message);
    }
};



const searchProductsService = async (searchCriteria) => {
  try {
    const {
      query,
      category,
      tags,
      page = 1,
      limit = 24
    } = searchCriteria;

    // Build search filter
    const filter = {};

    // Text search across English and Marathi names
    if (query && query.trim() !== '') {
      const searchRegex = new RegExp(query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
      
      filter.$or = [
        { eng_name: { $regex: searchRegex } },
        { mar_name: { $regex: searchRegex } },
        { tag: { $in: [searchRegex] } }
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Tags filter
    if (tags && tags.length > 0) {
      filter.tag = { $in: tags };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      ProductModel.find(filter)
        .populate('category')
        .sort({ createdAt: -1 }) // Show newest first
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (err) {
    throw new Error('Error searching products: ' + err.message);
  }
};

const fuzzySearchService = async (searchTerm, limit = 24) => {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    const cleanSearchTerm = searchTerm.trim();
    
    // OPTIMIZED: Use MongoDB text search instead of loading all products
    // First, try text search which is much faster
    const textSearchResults = await ProductModel.aggregate([
      {
        $match: {
          $text: { $search: cleanSearchTerm }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndMissingFields: true
        }
      },
      {
        $addFields: {
          score: { $meta: "textScore" }
        }
      },
      {
        $sort: { score: -1, createdAt: -1 }
      },
      {
        $limit: limit
      }
    ]);

    // If text search returns enough results, return them
    if (textSearchResults.length >= limit / 2) {
      return textSearchResults;
    }

    // If not enough results from text search, fall back to manual search
    // But fetch fewer products (100 instead of 1000)
    const allProducts = await ProductModel.find()
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(100); // Reduced for free tier memory constraints

    const matchedProducts = [];
    const searchTermLower = cleanSearchTerm.toLowerCase();
    const searchWords = searchTermLower.split(/\s+/).filter(w => w.length >= 2);

    // OPTIMIZED: Early exit if no search words
    if (searchWords.length === 0) {
      return [];
    }

    // OPTIMIZED: Use simple includes first for better performance
    for (const product of allProducts) {
      const engName = product.eng_name?.toLowerCase() || '';
      const marName = product.mar_name?.toLowerCase() || '';
      
      let productScore = 0;
      
      // Quick checks first
      if (engName.includes(searchTermLower) || marName.includes(searchTermLower)) {
        productScore += 20;
      }
      
      // Check for word matches
      for (const word of searchWords) {
        if (word.length < 2) continue;
        
        if (engName.includes(word)) productScore += 5;
        if (marName.includes(word)) productScore += 5;
        
        // Check word boundaries for better matches
        const engWords = engName.split(/\s+/);
        const marWords = marName.split(/\s+/);
        
        for (const engWord of engWords) {
          if (engWord === word) productScore += 10;
          else if (engWord.includes(word) && word.length >= 3) productScore += 3;
        }
        
        for (const marWord of marWords) {
          if (marWord === word) productScore += 10;
          else if (marWord.includes(word) && word.length >= 3) productScore += 3;
        }
      }
      
      // Only use expensive similarity calculation for products with some score
      if (productScore > 0) {
        // Calculate similarity only for top candidates
        const engSimilarity = searchTermLower.length >= 3 ? 
          simpleSimilarity(searchTermLower, engName) : 0;
        const marSimilarity = searchTermLower.length >= 3 ? 
          simpleSimilarity(searchTermLower, marName) : 0;
        
        productScore += Math.max(engSimilarity, marSimilarity) * 2;
        
        if (productScore > 5) { // Threshold to include
          matchedProducts.push({ product, score: productScore });
        }
      }
    }

    // Sort and limit
    matchedProducts.sort((a, b) => b.score - a.score);
    
    const finalResults = matchedProducts
      .slice(0, limit)
      .map(item => item.product);
    
    // Combine with text search results (remove duplicates)
    const combinedResults = [...textSearchResults];
    const existingIds = new Set(textSearchResults.map(p => p._id.toString()));
    
    for (const product of finalResults) {
      if (!existingIds.has(product._id.toString()) && combinedResults.length < limit) {
        combinedResults.push(product);
      }
    }
    
    return combinedResults;
    
  } catch (err) {
   
    // Fallback to simple search on error
    return await simpleSearchFallback(searchTerm, limit);
  }
};

// OPTIMIZED: Simpler similarity calculation
function simpleSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  // Quick equality check
  if (str1 === str2) return 1.0;
  
  // Length similarity
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 0;
  
  // Check if one contains the other
  if (str1.includes(str2) || str2.includes(str1)) {
    const minLen = Math.min(str1.length, str2.length);
    return minLen / maxLen;
  }
  
  // Simple character overlap
  let matches = 0;
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] === str2[i]) matches++;
  }
  
  return matches / maxLen;
}

// Fallback search function for error recovery
async function simpleSearchFallback(searchTerm, limit = 24) {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) return [];
    
    const cleanSearchTerm = searchTerm.trim().toLowerCase();
    
    // Use regex for basic search
    return await ProductModel.find({
      $or: [
        { eng_name: { $regex: cleanSearchTerm, $options: 'i' } },
        { mar_name: { $regex: cleanSearchTerm, $options: 'i' } }
      ]
    })
    .populate('category')
    .sort({ createdAt: -1 })
    .limit(limit);
  } catch (err) {
    console.error('Fallback search error:', err.message);
    return [];
  }
}

// Setup text index (run this once)
async function setupSearchIndex() {
  try {
    await ProductModel.collection.createIndex(
      { 
        eng_name: "text", 
        mar_name: "text"
      },
      {
        name: "search_index",
        weights: {
          eng_name: 2,
          mar_name: 1
        }
      }
    );
    console.log('Search index created successfully');
  } catch (err) {
    console.log('Search index already exists or error:', err.message);
  }
}

// Add to module exports
module.exports = {
  createProductService,
  findProductById,
  findProductByName,
  getAllProducts,
  updateProductById,
  deleteProductByName,
  deleteProductById,
  findProductByIdWithCategory,
  searchProductsService,
  toggleProductVisibilityService,
  fuzzySearchService // Add this
};

