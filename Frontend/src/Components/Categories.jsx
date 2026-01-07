import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import axios from '../config/axios';
import Navbar from "./Navbar";
import { ArrowLeft, X, Upload,Clipboard } from "lucide-react"
import toast from "react-hot-toast";


function Categories() {

  const [category, setCategory] = useState({});
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('Admin-Token')
  const [loading, setLoading] = useState(true)
  const location = useLocation();


  useEffect(()=>{
    setLoading(true);
    axios.get(`/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res)=>{
      setCategory(res.data.category)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false)
    })
  },[token])


  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };
  
  

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
          className="w-full flex items-center justify-between mt-6 text-gray-700 hover:text-black cursor-pointer transition"
         
        >
          <div className="flex items-center gap-2"  onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
          </div>
          <div className="flex items-center gap-2"  onClick={() => copyLinkToClipboard()}>
          <Clipboard className="w-5 h-5" />
          <span className="font-medium">Copy Link</span>
          </div>
          


        </div>

      {/* Product Grid */}
      <div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 mb-8">
{loading ? <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading products...
                </p>
                <img
                  src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778973/loading_tifftz.gif"
                  className="h-[30vh] w-auto"
                  alt="Loading"
                />
              </div> :<div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 my-8">
  {category?.products && category.products.length > 0 ? (
    category.products.map((product, index) => (
      <Product
      key={index}
       product ={product}
      />
    ))
  ) : (
    <p className="text-gray-500 text-sm text-center my-6">
      No products available in this category.
    </p>
  )}
</div>}
       


      </div>
    </div>
  );
}

export default Categories;
