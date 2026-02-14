import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { toast, Toaster } from 'react-hot-toast';
import { LanguageContext } from "../context/LanguageContext";
import {setWithExpiry,getWithExpiry} from '../utils/localStorage'
import gsap from "gsap";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const wpRef = useRef(null);
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const token = localStorage.getItem('Admin-Token')
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { language } = useContext(LanguageContext);
  const CART_KEY = "cartproducts";

  let addToCartCooldown = false;

const addToCart = (e) => {
  e.preventDefault();

  if (addToCartCooldown) {
    toast.error("Please wait a few seconds before adding again!");
    return;
  }

  const existing = JSON.parse(localStorage.getItem(CART_KEY)) || [];
 

  const alreadyAdded = existing.find(item => item._id === product._id);
  if (alreadyAdded) {
    toast.error("This product is already in your cart!");
    return;
  }

  const updated = [...existing, { ...product }]; // clone to avoid reference issues
  localStorage.setItem(CART_KEY, JSON.stringify(updated));

  toast.success("Added Successfully");

  addToCartCooldown = true;
  setTimeout(() => {
    addToCartCooldown = false;
  }, 3000);
};

  

  useEffect(() => {
    if (!id) return;
    setLoading(true);
  
    try {
      const cachedCategories = getWithExpiry("categories") || [];
  
      let foundProduct = null;
      let parentCategory = null;
  
      for (const category of cachedCategories) {
        const product = category.products?.find(p => p._id === id);
        if (product) {
          foundProduct = product;
          parentCategory = category;
          break;
        }
      }
  
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct?.img?.[0]?.url || null);
  
        if (parentCategory?.products) {
          const related = parentCategory.products
            .filter(p => p._id !== id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
  
          setRelatedProducts(related);
        }
  
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Local cache failed, falling back to API");
    }
  
    axios
      .get(`/product/${id}`)
      .then(res => {
        const product = res.data.product;
        setProduct(product);
        setSelectedImage(product?.img?.[0]?.url || null);
  
        if (product?.category) {
          fetchRelatedProducts(product.category, product._id);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);
  
  
  
  const fetchRelatedProducts = async (categoryId, currentProductId) => {
    try {
      let cachedCategories = getWithExpiry("categories") || [];
      let cachedCategory = cachedCategories.find(cat => cat._id === categoryId);
  
      if (cachedCategory?.products?.length) {
        const related = cachedCategory.products
          .filter(p => p._id !== currentProductId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
  
        setRelatedProducts(related);
        return; // stop — cache hit
      }
    } catch (err) {
      console.warn("LocalStorage failed, falling back to API");
    }
  
    // Fallback: fetch ALL categories to update cache
    try {
      const res = await axios.get("/category/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allCategories = res?.data?.categories || [];
      setWithExpiry("categories", allCategories, 6 * 60 * 60 * 1000); // 6h TTL
  
      const thisCategory = allCategories.find(cat => cat._id === categoryId);
      if (thisCategory?.products?.length) {
        const related = thisCategory.products
          .filter(p => p._id !== currentProductId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
  
        setRelatedProducts(related);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };
  
  

  const handleImageClick = (imageUrl) => {
    setZoomImage(imageUrl);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
    setZoomImage(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        handleCloseZoom();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isZoomed]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  const handleProductClick = (productId) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // optional, use 'auto' if you want instant scroll
    });
    navigate(`/product/${productId}`);
    
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // optional, use 'auto' if you want instant scroll
    });
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Product Copied Successfully!');
  };
  
  useEffect(() => {
    gsap.to(wpRef.current, {
      scale: 1.3,
      
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);
 
  return (
    <div className="min-h-screen w-full bg-[#f9f5f5] flex flex-col items-center p-4 md:p-10 overflow-hidden relative">
      <Navbar />
      <a href="https://wa.me/919561000027?text=Hello%20I%20want%20to%20know%20more"
   target="_blank"
   ref={wpRef}
   class="inline-flex items-center gap-2 fixed right-0 top-[60%]  z-[99999]
   bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885268/wp_wbpw2n.png')] bg-cover bg-center bg-no-repeat
          px-10 py-10 text-sm font-medium 
          text-green-700  rounded-lg
          shadow-sm 
          hover:bg-green-200 hover:text-green-800 
          transition">
   
</a>

      <div className="w-[90%] md:w-[80%] flex items-center gap-2 mt-24 mb-4 text-gray-700 hover:text-black transition z-[999999]">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="w-5 h-5 cursor-pointer"
        />
        <span className="cursor-pointer font-medium">Back</span>
      </div>
      <Toaster />
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading product...
          </p>
          <img
            src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778973/loading_tifftz.gif"
            className="h-[30vh] w-auto"
            alt="Loading"
          />
        </div>
      ) : product ? (
        <>
          <div className="container bg-[#efefef] border border-black w-full md:w-[60%] rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              
              <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
                <div 
                  className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center cursor-zoom-in"
                  onClick={() => handleImageClick(selectedImage)}
                >
                  <img
                    src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
                    alt="logo background"
                    className="absolute top-1/2 left-1/2 w-[80%] h-[80%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 opacity-50 -rotate-[35deg] mix-blend-multiply"
                    onContextMenu={handleContextMenu}
                    draggable="false"
                  />

                  <img
                    src={selectedImage || product?.img?.[0]?.url || "/placeholder.png"}
                    alt={product.eng_name}
                    className="relative z-10 w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-105"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    draggable="false"
                  />
                </div>

                <div className="flex md:flex-col gap-3">
                  {Array.isArray(product?.img) &&
                   product.img.length > 1 &&
                   product.img.slice(1).map((img, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-black"
                        onClick={() => {
                          setSelectedImage(img.url);
                          handleImageClick(img.url);
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
                          alt="logo watermark"
                          className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain opacity-50 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] mix-blend-multiply"
                          onContextMenu={handleContextMenu}
                          draggable="false"
                        />
                        <img
                          src={img?.url || "/placeholder.png"}
                          alt={`Gallery ${index + 1}`}
                          className="relative z-10 w-full h-full object-cover"
                          onContextMenu={handleContextMenu}
                          onDragStart={handleDragStart}
                          draggable="false"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6 md:mt-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold text-black pb-6">
                  {language === "en"
                    ? product.eng_name
                    : product.mar_name}
                    <i className="ri-link mx-6 cursor-pointer" onClick={()=>{handleCopyLink()}}></i>
                </h2>

                <p className="text-gray-700 text-base leading-6">
                  {language === "en"
                    ? product.eng_description
                    : product.mar_description}
                </p>
                    
                <p className="text-sm text-gray-600 italic opacity-80 mt-4">
                  *Disclaimer: Actual product may vary slightly from the image shown.
                </p>
                <p className="text-sm text-gray-600 italic opacity-80 mt-4">Contact now : 9561000027</p>
                <button
        onClick={addToCart}
        className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold text-black bg-gray-100 hover:scale-105 py-2 rounded-md transition"
      >
        <i className="ri-shopping-cart-2-line text-lg"></i>
        Add to Cart
      </button>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="w-full md:w-[80%] mt-12 mb-8">
              <h3 className="text-2xl font-semibold text-black mb-6 text-center">
                Related Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div 
                    key={relatedProduct._id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleProductClick(relatedProduct._id)}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
                        alt="logo background"
                        className="absolute top-1/2 left-1/2 w-[60%] h-[60%] object-contain -translate-x-1/2 -translate-y-1/2 opacity-50 scale-125 -rotate-[35deg] mix-blend-multiply"
                      />
                      {relatedProduct.img?.[0]?.url && (
                        <img
                        src={`${relatedProduct.img[0].url}?f_auto,q_auto:eco,w=400`}
                        srcSet={`
                          ${relatedProduct.img[0].url}?f_auto,q_auto:eco,w=400 400w,
                          ${relatedProduct.img[0].url}?f_auto,q_auto:eco,w=800 800w,
                          ${relatedProduct.img[0].url}?f_auto,q_auto:eco,w=1200 1200w
                        `}
                        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                        alt={relatedProduct.eng_name}
                        loading="lazy"
                        className="relative z-10 w-full h-full object-contain p-4"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        draggable="true"
                      />
                      
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-900 truncate">
                        {language === "en" 
                          ? relatedProduct.eng_name 
                          : relatedProduct.mar_name}
                      </h4>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {language === "en"
                          ? relatedProduct.eng_description?.substring(0, 100) + "..."
                          : relatedProduct.mar_description?.substring(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-600 text-lg mt-20">
          Product not found
        </div>
      )}

      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4 overflow-visible"
          onClick={handleCloseZoom}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 z-[10000]"
            onClick={handleCloseZoom}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute inset-0 z-10"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            />
            
            <img
              src={zoomImage}
              alt="Zoomed view"
              className="w-full h-full object-contain max-h-[55vh] rounded-lg relative"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
              draggable="false"
            />
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="text-white text-opacity-20 text-6xl font-bold rotate-[-30deg] select-none">
               <img src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778975/logo_fdy5er.png" alt="" />
              </div>
            </div>
            
            <div className="absolute top-[0%] text-nowrap max-w-none left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm">
              ⚠️ Images are protected
            </div>
            
            <div className="absolute bottom-0 left-1/2 text-nowrap transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <span>Click outside to close</span>
              <span className="text-xs opacity-70">or press ESC</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;