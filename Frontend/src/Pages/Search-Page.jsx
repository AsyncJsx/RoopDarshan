import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Product from '../Product/Product';
import axios from '../config/axios';
import gsap from 'gsap';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/product/search/fuzzy?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data.products || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch();
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.querySelector(".form");

    gsap.set(navbar, { opacity: 1 });

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Scroll down 40px → hide navbar
      if (currentScroll > lastScroll && currentScroll > 40) {
       
        gsap.to(navbar, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Scroll up → show navbar
      if (currentScroll < lastScroll) {
        gsap.to(navbar, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return (
    <div className='min-h-screen w-full  text-white relative overflow-x-hidden'>
      <Navbar/>

      <div className="form w-full flex justify-center mt-6 px-4 fixed md:top-[35%] top-[20%] z-[9999]">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-xl flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search for products, categories and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#222] border border-gray-600 outline-none focus:border-gray-300"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#5da7f7] hover:bg-blue-700 rounded-md"
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </form>
      </div>
      
      <div className="result absolute z-[9999] md:top-[50%] top-[25%] products w-full flex flex-wrap justify-center md:gap-6 gap-3 my-8">
  
  {/* 🔄 Loading State */}
  {loading && (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300 font-medium">
        Searching products...
      </p>
      <img
        src="/loading.gif"
        className="h-[30vh] w-auto"
        alt="Loading"
      />
    </div>
  )}

  {/* ✅ Results */}
  {!loading &&
    searchResults.map((product, index) => (
      <Product
        key={index}
        product={product}
      />
    ))
  }

  {/* ❌ No Results */}
  {searchQuery && searchResults.length === 0 && !loading && (
    <div className="text-white text-lg mt-6">
      No products found
    </div>
  )}
</div>

    </div>
  )
}

export default SearchPage