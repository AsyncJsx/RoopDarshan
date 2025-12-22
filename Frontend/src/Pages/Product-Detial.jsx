import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { LanguageContext } from "../context/LanguageContext";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-[#f9f5f5] flex flex-col items-center p-10 overflow-hidden">
      <Navbar />

      {/* Back Arrow */}
      <div className="w-[80%] flex items-center gap-2 mt-24 mb-4 text-gray-700 hover:text-black transition">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="w-5 h-5 cursor-pointer"
        />
        <span className="cursor-pointer font-medium">Back</span>
      </div>

      {/* 🔄 Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading product...
          </p>
          <img
            src="/loading.gif"
            className="h-[30vh] w-auto"
            alt="Loading"
          />
        </div>
      ) : product ? (
        /* Product Container */
        <div className="container bg-[#efefef] border border-black md:w-[60%] rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            
            {/* Images */}
            <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
              {/* Main Image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center">
                <img
                  src="/logo-black.png"
                  alt="logo background"
                  className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 -rotate-[35deg] mix-blend-multiply"
                />

                <img
                  src={product?.img?.[0]?.url || "/placeholder.png"}
                  alt={product.eng_name}
                  className="relative z-10 w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Gallery */}
              <div className="flex md:flex-col gap-3">
                {Array.isArray(product?.img) &&
                  product.img.length > 1 &&
                  product.img.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300"
                    >
                      <img
                        src="/logo-black.png"
                        alt="logo watermark"
                        className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] mix-blend-multiply"
                      />
                      <img
                        src={img?.url || "/placeholder.png"}
                        alt={`Gallery ${index + 1}`}
                        className="relative z-10 w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-black pb-6">
                {language === "en"
                  ? product.eng_name
                  : product.mar_name}
              </h2>

              <p className="text-gray-700 text-base leading-6">
                {language === "en"
                  ? product.eng_description
                  : product.mar_description}
              </p>

              <p className="text-sm text-gray-600 italic opacity-80 mt-4">
                *Disclaimer: Actual product may vary slightly from the image shown.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ❌ Product not found
        <div className="text-gray-600 text-lg mt-20">
          Product not found
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
