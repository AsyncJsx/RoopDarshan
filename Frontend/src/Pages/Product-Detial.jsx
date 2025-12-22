import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { LanguageContext } from "../context/LanguageContext";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        // Set first image as selected by default
        if (res.data.product?.img?.[0]?.url) {
          setSelectedImage(res.data.product.img[0].url);
        }
      })
      .catch((err) => {
        console.log(err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Handle image click to zoom
  const handleImageClick = (imageUrl) => {
    setZoomImage(imageUrl);
    setIsZoomed(true);
  };

  // Handle closing the zoom modal
  const handleCloseZoom = () => {
    setIsZoomed(false);
    setZoomImage(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        handleCloseZoom();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isZoomed]);

  // Prevent right-click and image dragging
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // Prevent image dragging
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="min-h-screen w-full bg-[#f9f5f5] flex flex-col items-center p-10 overflow-hidden relative">
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
              <div 
                className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center cursor-zoom-in"
                onClick={() => handleImageClick(selectedImage)}
              >
                <img
                  src="/logo-black.png"
                  alt="logo background"
                  className="absolute top-1/2 left-1/2 w-[80%] h-[80%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 -rotate-[35deg] mix-blend-multiply"
                  onContextMenu={handleContextMenu}
                  draggable="false"
                />

                <img
                  src={selectedImage || product?.img?.[0]?.url || "/placeholder.png"}
                  alt={product.eng_name}
                  className="relative z-10 w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-105"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable="false"
                />
              </div>

              {/* Gallery */}
              <div className="flex md:flex-col gap-3">
                {Array.isArray(product?.img) &&
                 product.img.length > 1 &&
                 product.img.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-black"
                      onClick={() => {
                        setSelectedImage(img.url);
                        handleImageClick(img.url);
                      }}
                    >
                      <img
                        src="/logo-black.png"
                        alt="logo watermark"
                        className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] mix-blend-multiply"
                        onContextMenu={handleContextMenu}
                        draggable="false"
                      />
                      <img
                        src={img?.url || "/placeholder.png"}
                        alt={`Gallery ${index + 1}`}
                        className="relative z-10 w-full h-full object-cover"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        draggable="false"
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
              <p className="text-sm text-gray-600 italic opacity-80 mt-4">Contact now : 9561000027 </p>
              
            </div>
          </div>
        </div>
      ) : (
        // ❌ Product not found
        <div className="text-gray-600 text-lg mt-20">
          Product not found
        </div>
      )}

      {/* Zoom Modal/Overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4 overflow-visible"
          onClick={handleCloseZoom}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 z-[10000]"
            onClick={handleCloseZoom}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoomed Image Container with Protected Layer */}
          <div 
            className="relative max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Transparent overlay to prevent direct image access */}
            <div 
              className="absolute inset-0 z-10"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            />
            
            <img
              src={zoomImage}
              alt="Zoomed view"
              className="w-full h-full object-contain max-h-[55vh] rounded-lg relative"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
              draggable="false"
            />
            
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="text-white text-opacity-20 text-6xl font-bold rotate-[-30deg] select-none">
               <img src="/logo.png" alt="" />
              </div>
            </div>
            
            {/* Download Prevention Message */}
            <div className="absolute top-[0%] text-nowrap max-w-none left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm">
              ⚠️ Images are protected
            </div>
            
            {/* Zoom Controls */}
            <div className="absolute bottom-0 left-1/2 text-nowrap transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <span>Click outside to close</span>
              <span className="text-xs opacity-70">or press ESC</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;