import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

function Admin_Product({ product, onDelete, onToggleVisibility, isSelected, onSelect }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">

      {/* Bulk select checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(product._id)}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 z-30 w-4 h-4 cursor-pointer accent-black"
      />

      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100">
          <img
            src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
            alt="logo watermark"
            className="absolute inset-0 w-[80%] h-[80%] object-contain rotate-[-25deg] scale-125 opacity-50 translate-x-[20%] translate-y-[10%]"
          />
          <img
            src={`${product.img[0].url}?f_auto,q_auto:eco,w=400`}
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
          <span className={`absolute top-2 left-2 z-20 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            product.visible !== false
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {product.visible !== false ? "Visible" : "Hidden"}
          </span>
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
              <span key={index} className="bg-gray-100 border border-gray-300 text-gray-700 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-[10px] italic">No tags</span>
          )}
        </div>
      </Link>

      {/* Action buttons */}
      <div className="w-full h-8 flex items-center justify-end gap-3 mt-1">
        {/* Toggle visibility — inline, no page nav */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(product._id); }}
          className={`text-xl ${
            product.visible !== false
              ? "ri-eye-line text-blue-500 hover:text-blue-700"
              : "ri-eye-off-line text-gray-400 hover:text-gray-600"
          }`}
        />

        <Link
          to={`/product/edit/${product._id}`}
          onClick={(e) => e.stopPropagation()}
          className="ri-edit-2-line text-green-500 text-xl hover:text-green-700"
        />

        {/* Delete inline — no page navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(product._id); }}
          className="ri-delete-bin-line text-red-500 text-xl hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default Admin_Product;