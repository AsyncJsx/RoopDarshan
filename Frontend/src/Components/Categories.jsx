import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import axios from '../config/axios';
import Navbar from "./Navbar";
import { ArrowLeft, X, Upload } from "lucide-react"


function Categories() {

  const [category, setCategory] = useState({});
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('Admin-Token')

  useEffect(()=>{
    axios.get(`/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res)=>{
      setCategory(res.data.category)
    }).catch((err)=>{
      console.log(err);
    })
  },[token])

  const { language, setLanguage }  = useContext(LanguageContext)

  return (
    <div className="w-full min-h-[50vh] flex flex-col relative md:p-12 p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-10 transition-all hover:shadow-lg">
      <Navbar/>

      
      {/* Category Title */}
      <h3 className="categoryname text-gray-900 tracking-wide md:text-2xl text-lg font-semibold text-center mb-2 mt-44">
          
          {language === "en" ? category.eng_name : category.mar_name}
      </h3>
      

      {/* Category Description */}
      <h2 className="categorydescription text-gray-600 tracking-wide md:text-sm text-sm font-normal text-center max-w-2xl mx-auto">
      {language === "en" ? category.eng_description : category.mar_description}
      </h2>
      <div
          className="w-[80%] flex items-center gap-2 mt-6 text-gray-700 hover:text-black cursor-pointer transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>

      {/* Product Grid */}
      <div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 mb-8">

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
