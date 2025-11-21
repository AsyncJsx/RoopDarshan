import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // for the back arrow icon
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../config/axios';
import { LanguageContext } from "../context/LanguageContext";


function ProductDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [product, setProduct] = useState({})

  
  const { language, setLanguage }  = useContext(LanguageContext)

  useEffect(() => {

    if (!id) return; // wait until product is available
  
    axios.get(`/product/${id}`)
      .then((res) => {
       setProduct(res.data.product)
      })
      .catch((err) => console.log(err));
  }, [id]); // run only when _id is set
  

  return (
    <div className="min-h-screen w-full bg-[#f9f5f5] flex flex-col items-center p-10 overflow-hidden">
      <Navbar />

      {/* Back Arrow */}
      <div className="w-[80%] flex items-center gap-2 mt-24 mb-4 text-gray-700 hover:text-black transition">
        <ArrowLeft
          onClick={() => {
            navigate(-1);
          }}
          className="w-5 h-5 cursor-pointer"
        />
        <span className="cursor-pointer font-medium">Back</span>
      </div>

      {/* Product Container */}
      <div className="container bg-[#efefef] border border-black md:w-[60%] rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center">
        {/* Product Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left: Images */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
            {/* Main Product Image */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center">
              {/* Logo Background */}
              <img
                src="/logo-black.png"
                alt="logo background"
                className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 -rotate-[35deg] mix-blend-multiply"
              />

              {/* Main Image */}
              <img
                src={product?.img?.[0]?.url || "/placeholder.png"}
                alt={product.name}
                className="relative z-10 w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Side Gallery */}
            <div className="flex md:flex-col gap-3">
            {Array.isArray(product?.img) && product.img.length > 1 ? (
  product.img.slice(1).map((img, index) => (
    <div
      key={index}
      className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 rounded-lg overflow-hidden border border-gray-300 hover:border-gray-500 transition-all cursor-pointer"
    >
      {/* Logo Watermark */}
      <img
        src="/logo-black.png"
        alt="logo watermark"
        className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] scale-110 mix-blend-multiply"
      />

      {/* Gallery Image */}
      <img
        src={img?.url || "/placeholder.png"}
        alt={`Gallery ${index + 2}`} // +2 because 1st element skipped
        className="relative z-10 w-full h-full object-cover"
      />
    </div>
  ))
) 
: (
  ''
)}

</div>

          </div>

          {/* Product Details */}
          <div className=" mt-6 md:mt-0 text-center md:text-left">
            <h2 className="product-name text-2xl md:text-3xl font-semibold text-black p-2 pb-7">
            {language === "en" ? product.eng_name : product.mar_name}
            </h2>
            <p className="text-gray-700 text-base leading-6 px-2 product-description">
            {language === "en" ? product.eng_description : product.mar_description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 px-2 py-3">
              {[].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 text-black font-medium text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-gray-600 italic opacity-80 px-2">
              *Disclaimer: Actual product may vary slightly from the image
              shown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
