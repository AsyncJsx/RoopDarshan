import React, { useContext } from "react";
import Admin_Product from "./Admin-Product";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { LanguageContext } from "../context/LanguageContext";

function Admin_Categories({category}) {

  const { language}  = useContext(LanguageContext)
  
  return (
    <div className="w-full min-h-[50vh] flex flex-col relative md:p-12 p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-10 transition-all hover:shadow-lg">

      {/* Category Title */}
      <h3 className="categoryname text-gray-900 tracking-wide md:text-2xl text-lg font-semibold text-center mb-2">
      {language === "en" ? category.eng_name : category.mar_name}
      </h3>

      {/* Category Description */}
      <h2 className="categorydescription text-gray-600 tracking-wide md:text-sm text-sm font-normal text-center max-w-2xl mx-auto">
      {language === "en" ? category.eng_description : category.mar_description}
      </h2>

      {/* Product Grid */}
      <div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 my-8">
  {category?.products && category.products.length > 0 ? (
    category.products.map((product, index) => (
      <Admin_Product
      key={index}
       product ={product}
      />
    ))
  ) : (
    <p className="text-gray-500 text-sm text-center my-6">
      No products available in this category.
    </p>
  )}
</div>
      <div className=" w-full h-8 flex items-center justify-end gap-3">
      <Link to={`/category/edit/${category._id}`} class="ri-edit-2-line text-green-500 text-xl hover:text-green-700 hover:underline underline-offset-4"></Link>
      <Link to={`/category/delete/${category._id}`}  class="ri-delete-bin-line text-red-500 text-xl hover:text-red-700 hover:underline underline-offset-4"></Link>
      </div>
    </div>
  );
}

export default Admin_Categories;
