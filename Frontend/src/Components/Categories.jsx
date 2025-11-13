import React, { useContext, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";


function Categories({category}) {

  const { language, setLanguage }  = useContext(LanguageContext)

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

        {/* Products Section */}
<div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 my-8">
  {category?.products && category.products.length > 0 ? (
    category.products.map((product, index) => (
      <Product
       product ={product}
      />
    ))
  ) : (
    <p className="text-gray-500 text-sm text-center my-6">
      No products available in this category.
    </p>
  )}
</div>

      </div>
    </div>
  );
}

export default Categories;
