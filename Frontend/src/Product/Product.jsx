import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

function Product({product}) {

  const { language }  = useContext(LanguageContext)
  
 
  return (
    <Link to={`/product/${product._id}`} className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      
      {/* Product Image */}
      <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100 ">
        {/* Logo Watermark */}
        <img
          src={'/logo-black.png'}
          alt="logo watermark"
          className="absolute inset-0 w-[80%] h-[80%] object-contain  rotate-[-25deg] scale-150 translate-x-[20%] translate-y-[10%]"
        />

        {/* Main Product Image */}
        <img
          src={product.img[0].url}
          alt={product.eng_name}
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-sm md:text-base font-semibold mt-3 text-gray-900 truncate">
      {language === "en" ? product.eng_name : product.mar_name}
      </h3>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
      {language === "en" ? product.eng_description : product.mar_description}
      </p>


      {/* Tags */}
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


    </Link>
  );
}

export default Product;
