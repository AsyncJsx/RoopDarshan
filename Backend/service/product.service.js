const { ProductModel } = require('../models/product');

const createProductService = async (data) => {
    const { eng_name, mar_name, img, eng_description, mar_description, category,tag} = data;

    if (!eng_name || !mar_name || !img || !eng_description || !mar_description || !category ) {
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
        throw new Error('Error creating product: ' + err.message);
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
  
      const cleanSearchTerm = searchTerm.trim().toLowerCase();
      
      const allProducts = await ProductModel.find()
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(1000);
  
      const matchedProducts = allProducts.filter(product => {
        const engName = product.eng_name.toLowerCase();
        const marName = product.mar_name.toLowerCase();
        
        const engWords = engName.split(/\s+/);
        const marWords = marName.split(/\s+/);
        
        let engMatch = false;
        let marMatch = false;
  
        for (const word of engWords) {
          if (word.length < 2) continue;
          
          const similarity = calculateSimilarity(cleanSearchTerm, word);
          if (similarity >= 0.7) {
            engMatch = true;
            break;
          }
          
          if (cleanSearchTerm.includes(word) || word.includes(cleanSearchTerm)) {
            engMatch = true;
            break;
          }
        }
  
        for (const word of marWords) {
          if (word.length < 2) continue;
          
          const similarity = calculateSimilarity(cleanSearchTerm, word);
          if (similarity >= 0.7) {
            marMatch = true;
            break;
          }
          
          if (cleanSearchTerm.includes(word) || word.includes(cleanSearchTerm)) {
            marMatch = true;
            break;
          }
        }
  
        if (engName.includes(cleanSearchTerm) || marName.includes(cleanSearchTerm)) {
          return true;
        }
  
        if (cleanSearchTerm.length >= 3) {
          const directEngMatch = calculateSimilarity(cleanSearchTerm, engName) >= 0.6;
          const directMarMatch = calculateSimilarity(cleanSearchTerm, marName) >= 0.6;
          if (directEngMatch || directMarMatch) {
            return true;
          }
        }
  
        return engMatch || marMatch;
      });
  
      const scoredProducts = matchedProducts.map(product => {
        const engName = product.eng_name.toLowerCase();
        const marName = product.mar_name.toLowerCase();
        
        let score = 0;
        
        if (engName.includes(cleanSearchTerm) || marName.includes(cleanSearchTerm)) {
          score += 10;
        }
        
        const engSimilarity = calculateSimilarity(cleanSearchTerm, engName);
        const marSimilarity = calculateSimilarity(cleanSearchTerm, marName);
        score += Math.max(engSimilarity, marSimilarity) * 5;
        
        const engWords = engName.split(/\s+/);
        const marWords = marName.split(/\s+/);
        
        engWords.forEach(word => {
          if (word === cleanSearchTerm) score += 3;
          else if (word.includes(cleanSearchTerm) || cleanSearchTerm.includes(word)) score += 2;
        });
        
        marWords.forEach(word => {
          if (word === cleanSearchTerm) score += 3;
          else if (word.includes(cleanSearchTerm) || cleanSearchTerm.includes(word)) score += 2;
        });
        
        return { product, score };
      });
  
      scoredProducts.sort((a, b) => b.score - a.score);
      
      return scoredProducts.slice(0, limit).map(item => item.product);
    } catch (err) {
      throw new Error('Error in fuzzy search: ' + err.message);
    }
  };
  
  function calculateSimilarity(str1, str2) {
    if (str1 === str2) return 1.0;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (shorter.length === 0) return 0.0;
    
    const distance = levenshteinDistance(str1, str2);
    
    return 1 - (distance / longer.length);
  }
  
  function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
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
  fuzzySearchService // Add this
};

