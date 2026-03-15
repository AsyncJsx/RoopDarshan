import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { ChevronUp, ChevronDown } from "lucide-react";

function AdminCategoryCard({ category, onReorder }) {
  const { language } = useContext(LanguageContext);
  const mainImg = category?.image?.url || "./no-image.png";

  return (
    <Link
      to={`/admin-category/${category._id}`}
      className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image Box */}
      <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100">

        {/* Watermark */}
        <img
          src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
          alt="watermark"
          className="absolute inset-0 w-[90%] h-[90%] object-contain rotate-[-25deg] scale-140 opacity-50 translate-x-[20%] translate-y-[10%]"
        />

        {/* Main Category Image */}
        <img
          src={`${mainImg}?f_auto,q_auto:eco,w=400`}
          srcSet={`
            ${mainImg}?f_auto,q_auto:eco,w=400 400w,
            ${mainImg}?f_auto,q_auto:eco,w=800 800w,
            ${mainImg}?f_auto,q_auto:eco,w=1200 1200w
          `}
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt={language === "en" ? category.eng_name : category.mar_name}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
        />

        {/* ✅ Visibility Badge */}
        <span className={`absolute top-2 left-2 z-20 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          category.visible !== false
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {category.visible !== false ? "Visible" : "Hidden"}
        </span>

        {/* ✅ Reorder arrows */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onReorder(category._id, 'up'); }}
            className="bg-white border border-gray-300 rounded p-0.5 hover:bg-gray-100 transition"
          >
            <ChevronUp className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onReorder(category._id, 'down'); }}
            className="bg-white border border-gray-300 rounded p-0.5 hover:bg-gray-100 transition"
          >
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </button>
        </div>
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

      <div className="w-full h-8 flex items-center justify-end gap-3">
        <Link
          to={`/category/visible/${category._id}`}
          onClick={(e) => e.stopPropagation()}
          className={`${category.visible !== false ? 'ri-eye-line' : 'ri-eye-off-line'} text-blue-500 text-xl hover:text-blue-700 hover:underline underline-offset-4`}
        />
        <Link
          to={`/category/edit/${category._id}`}
          onClick={(e) => e.stopPropagation()}
          className="ri-edit-2-line text-green-500 text-xl hover:text-green-700 hover:underline underline-offset-4"
        />
        <Link
          to={`/category/delete/${category._id}`}
          onClick={(e) => e.stopPropagation()}
          className="ri-delete-bin-line text-red-500 text-xl hover:text-red-700 hover:underline underline-offset-4"
        />
      </div>
    </Link>
  );
}

export default AdminCategoryCard;