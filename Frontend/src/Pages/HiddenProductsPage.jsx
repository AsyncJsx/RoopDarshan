import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import axios from "../config/axios";
import Navbar from "../Components/Navbar";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function HiddenProductsPage() {
  const [hiddenProducts, setHiddenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const token = localStorage.getItem("Admin-Token");

  const fetchHiddenProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/product/all", {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: (status) => status === 200 || status === 404, // accept both
      });
      
      const allProducts = res?.data?.products || [];
      const hidden = allProducts.filter((p) => p.visible === false);
      setHiddenProducts(hidden);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load hidden products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHiddenProducts();
  }, []);

  const handleToggleVisibility = async (productId) => {
    setTogglingId(productId);
    try {
      await axios.patch(
        `/product/${productId}/visibility`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product is now visible!");
      setHiddenProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error toggling visibility:", err);
      toast.error("Failed to update visibility");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <Toaster />

      <div className="mx-auto px-4 md:px-12 py-8 mt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-[10vh]">
          <div
            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </div>

          <button
            onClick={fetchHiddenProducts}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Hidden Products
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            These products are hidden from customers. Click{" "}
            <strong>Make Visible</strong> to restore them.
          </p>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
              <p className="mt-4 text-gray-500 font-medium">
                Loading hidden products...
              </p>
            </div>
          ) : hiddenProducts.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-400">
              <Eye className="w-14 h-14 mb-4 opacity-30" />
              <p className="text-lg font-medium">No hidden products</p>
              <p className="text-sm mt-1">All products are currently visible.</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {hiddenProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-[48%] sm:w-[45%] md:w-60 p-3 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image with logo watermark */}
                  <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-md relative border border-gray-100">
                    {/* Logo watermark */}
                    <img
                      src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png"
                      alt="logo watermark"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain rotate-[-25deg] z-[999] scale-125 opacity-55 translate-x-[10%]"
                    />

                    {/* Hidden badge */}
                    <div className="absolute top-2 left-2 z-20 bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Hidden
                    </div>

                    {/* Product image */}
                    {product.img?.[0]?.url ? (
                      <img
                        src={`${product.img[0].url}?f_auto,q_auto:eco,w=400`}
                        alt={product.eng_name}
                        loading="lazy"
                        className="relative  w-full h-full object-contain transition-transform duration-500 hover:scale-110 z-[99999]"
                      />
                    ) : (
                      <div className="relative z-10 w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product name */}
                  <h3 className="text-sm md:text-base font-semibold mt-3 text-gray-900 truncate">
                    {language === "en" ? product.eng_name : product.mar_name}
                  </h3>

                  {/* Category */}
                  {product.category && (
                    <p className="text-[11px] text-blue-500 font-medium mt-0.5 truncate">
                      {typeof product.category === "object"
                        ? language === "en"
                          ? product.category.eng_name
                          : product.category.mar_name
                        : "Category"}
                    </p>
                  )}

                  {/* Price */}
                  {product.price && (
                    <p className="text-xs text-gray-500 mt-0.5">₹{product.price}</p>
                  )}

                  {/* Make Visible Button */}
                  <button
                    onClick={() => handleToggleVisibility(product._id)}
                    disabled={togglingId === product._id}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold text-black bg-gray-100 hover:scale-105 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {togglingId === product._id ? (
                      <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    {togglingId === product._id ? "Updating..." : "Make Visible"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HiddenProductsPage;