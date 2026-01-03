import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

function CategoryCard({ category }) {

  const { language } = useContext(LanguageContext);

  // Fallback image if no image exists
  const mainImg = category?.image?.url || "./no-image.png";

  return (
    <Link
      to={`/category/${category._id}`}
      className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image Box */}
      <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100">

        {/* Watermark */}
        <img
          src="./logo-black.png"
          alt="watermark"
          className="absolute inset-0 w-[100%] h-[100%] opacity-50 object-contain rotate-[-30deg] scale-[140%] translate-x-[10%] translate-y-[0%]"
        />

        {/* Main Category Image */}
        <img
          src={mainImg}
          alt={language === "en" ? category.eng_name : category.mar_name}
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Name */}
      <h3 className="text-sm md:text-base font-semibold mt-3 text-gray-900 truncate">
        {language === "en" ? category.eng_name : category.mar_name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {language === "en" ? category.eng_description : category.mar_description}
      </p>

      {/* No. of products */}
      <p className="text-[11px] sm:text-xs mt-2 text-gray-600 font-medium">
        {category.products?.length || 0} {language === "en" ? "Products" : "उत्पादने"}
      </p>
    </Link>
  );
}

export default CategoryCard;
