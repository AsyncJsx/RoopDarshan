import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Filter from "../Components/Filter";
import Categories from "../Components/Categories";
import { RiFilter3Line } from "react-icons/ri";
import gsap from "gsap";
import axios from "../config/axios";
import CategoryCard from "../Components/Category-Card";
import {setWithExpiry,getWithExpiry} from '../utils/localStorage'

function ProductsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterRef = useRef(null);
  const text1Ref = useRef(null);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  const handleFilterChange = (filters) => {
    console.log(filters);
  };

  useEffect(() => {
    const CACHE_TTL = 6 * 60 * 60 * 1000;
  
    const fetchCategories = async () => {
      try {
        setLoading(true);
  
        const cachedData = getWithExpiry("categories");
        const cachedMeta = getWithExpiry("categories_meta") || {};
        const now = Date.now();
  
        const { lastUpdated } = await axios.get("/category/lastUpdated").then(r => r.data);
  
        const isCacheValid =
          cachedData &&
          cachedMeta.expiresAt &&
          now < cachedMeta.expiresAt &&
          cachedMeta.lastUpdated === lastUpdated;
  
        if (isCacheValid) {
          setCategories(cachedData); // cachedData is array, no parse
          return;
        }
  
        const res = await axios.get("/category/all");
        const categories = res?.data?.categories || [];
  
        setCategories(categories);
        setWithExpiry("categories", categories, CACHE_TTL);
        setWithExpiry("categories_meta", { lastUpdated, expiresAt: now + CACHE_TTL }, CACHE_TTL);
  
      } catch (err) {
        console.error(err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  
  
  
  

  // 🔍 Filter categories
  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      category.eng_name?.toLowerCase().includes(searchLower) ||
      category.mar_name?.toLowerCase().includes(searchLower)
    );
  });

  // Sidebar initial position
  useEffect(() => {
    gsap.set(filterRef.current, { x: -300 });
  }, []);

  // Sidebar animation
  useEffect(() => {
    if (!filterRef.current) return;

    gsap.to(filterRef.current, {
      x: showFilter ? 0 : -300,
      opacity: showFilter ? 1 : 0,
      duration: 0.6,
      ease: showFilter ? "power3.out" : "power3.in",
    });
  }, [showFilter]);

  // Entry animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [text1Ref.current, searchRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      }
    );

    tl.fromTo(
      categoryRef.current,
      { opacity: 0, y: 300 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
      }
    );
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen w-screen bg-[#f9f9f9] relative pt-36 overflow-hidden text-gray-900">
      <Navbar />

      <div className="flex md:p-8 relative">
        {/* Filter Sidebar */}
        <div
          ref={filterRef}
          className="pt-32 p-4 fixed top-[10%] left-0 z-[9998] bg-white/90 backdrop-blur-md rounded-r-2xl shadow-lg opacity-0 border-r border-gray-200"
        >
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Products Section */}
        <div className="Products w-screen md:px-8">
          <h3
            ref={text1Ref}
            className="text-center text-4xl font-bold mb-6 text-gray-800"
          >
            Explore Collections
          </h3>

          {/* Search Bar */}
          <div ref={searchRef} className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full max-w-md px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>

          {/* Categories Section */}
          <div
            ref={categoryRef}
            className="products w-full flex flex-wrap justify-center md:gap-6 gap-3 my-8"
          >
            {loading ? (
              // 🔄 Loading UI
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading categories...
                </p>
                <img
                  src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778973/loading_tifftz.gif"
                  className="h-[30vh] w-auto"
                  alt="Loading"
                />
              </div>
            ) : (
              <>
                {filteredCategories.map((category, index) => (
                  <CategoryCard
                    key={category._id || index}
                    category={category}
                  />
                ))}

                {searchQuery && filteredCategories.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                      No categories found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
