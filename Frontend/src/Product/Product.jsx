import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { toast, Toaster } from 'react-hot-toast';

const CART_KEY = "cartproducts";

function Product({product}) {

  const { language }  = useContext(LanguageContext)

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
  
  
  return (
    <Link to={`/product/${product._id}`} className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      
      <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100 ">

        <img
          src={'https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png'}
          alt="logo watermark"
          loading="lazy"
          className="absolute inset-0 w-[100%] h-[100%] object-contain  rotate-[-25deg] scale-140 opacity-50 translate-x-[10%] translate-y-[0%]"
        />

        <img
          src={`${product.img[0].url}?f_auto,q_auto:eco,w=800`} 
          srcSet={`
            ${product.img[0].url}?f_auto,q_auto:eco,w=400 400w,
            ${product.img[0].url}?f_auto,q_auto:eco,w=800 800w,
            ${product.img[0].url}?f_auto,q_auto:eco,w=1200 1200w
          `}
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt={product.eng_name}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
        />

      </div>

      <h3 className="text-sm md:text-base font-semibold mt-3 text-gray-900 truncate">
        {language === "en" ? product.eng_name : product.mar_name}
      </h3>

      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {language === "en" ? product.eng_description : product.mar_description}
      </p>

      <div className="flex flex-wrap gap-1 mt-2">
        {Array.isArray(product?.tag) && product.tag.length > 0 ? (
          product.tag.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 border border-gray-300 text-gray-700 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))
        ) : (
          ''
        )}
      </div>

      {/* CART BUTTON */}
      {}
      <button
        onClick={addToCart}
        className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold text-black bg-gray-100 hover:scale-105 py-2 rounded-md transition"
      >
        <i className="ri-shopping-cart-2-line text-lg"></i>
        Add to Cart
      </button>

    </Link>
  );
}

export default Product;
