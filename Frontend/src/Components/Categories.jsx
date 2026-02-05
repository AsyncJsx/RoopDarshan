import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import axios from "../config/axios";
import Navbar from "./Navbar";
import { ArrowLeft, Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import { setWithExpiry, getWithExpiry } from '../utils/localStorage';

function Categories() {
  const [category, setCategory] = useState({});
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // tracks loaded products
  const [itemsPerPage, setItemsPerPage] = useState(20); // default desktop
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("Admin-Token");
  const [loading, setLoading] = useState(true);

  const { language } = useContext(LanguageContext);

  // Detect screen size to adjust items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(16); // mobile
      } else {
        setItemsPerPage(20); // desktop
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch category
  useEffect(() => {
    const CACHE_TTL = 2 * 24 * 60 * 60 * 1000;

    const fetchCategory = async () => {
      setLoading(true);

      try {
        let cachedCategories = getWithExpiry("categories") || [];
        let cachedCategory = cachedCategories.find(c => c._id === id);

        if (cachedCategory) {
          setCategory(cachedCategory);
          setVisibleProducts(cachedCategory.products.slice(0, itemsPerPage));
          setCurrentIndex(itemsPerPage);
          setLoading(false);
          return;
        }

        const res = await axios.get("/category/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allCategories = res?.data?.categories || [];
        setWithExpiry("categories", allCategories, CACHE_TTL);

        const thisCategory = allCategories.find(c => c._id === id) || {};
        setCategory(thisCategory);
        setVisibleProducts(thisCategory.products.slice(0, itemsPerPage));
        setCurrentIndex(itemsPerPage);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategory({});
        toast.error("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, token, itemsPerPage]);

  // Show more products
  const showMore = () => {
    const nextProducts = category.products.slice(currentIndex, currentIndex + itemsPerPage);
    setVisibleProducts(prev => [...prev, ...nextProducts]);
    setCurrentIndex(prev => prev + itemsPerPage);
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="w-full min-h-[50vh] flex flex-col relative md:p-12 p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-10 transition-all hover:shadow-lg">
      <Navbar />

      {/* Category Title */}
      <h3 className="categoryname text-gray-900 tracking-wide md:text-2xl text-lg font-semibold text-center mb-2 mt-44">
        {language === "en" ? category.eng_name : category.mar_name}
      </h3>

      {/* Category Description */}
      <h2 className="categorydescription text-gray-600 tracking-wide md:text-sm text-sm font-normal text-center max-w-2xl mx-auto">
        {language === "en" ? category.eng_description : category.mar_description}
      </h2>

      <div className="w-full flex items-center justify-between mt-6 text-gray-700 hover:text-black cursor-pointer transition">
        <div className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>

        <div className="flex items-center gap-2" onClick={copyLinkToClipboard}>
          <Clipboard className="w-5 h-5" />
          <span className="font-medium">Copy Link</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 mb-4">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
            <img
              src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778973/loading_tifftz.gif"
              className="h-[30vh] w-auto"
              alt="Loading"
            />
          </div>
        ) : visibleProducts && visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center my-6">
            No products available in this category.
          </p>
        )}
      </div>

      {/* Show More Button */}
      {!loading && currentIndex < (category.products?.length || 0) && (
        <div className="flex justify-center mb-6">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}

      
    </div>
  );
}

export default Categories;
