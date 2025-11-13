import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Filter from "../Components/Filter";
import Categories from "../Components/Categories";
import { RiFilter3Line } from "react-icons/ri"; 
import gsap from "gsap";

import axios from '../config/axios';

function ProductsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  
  const text1Ref = useRef(null);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  const token = localStorage.getItem("Admin-Token");

  const handleFilterChange = (filters) => {
    console.log(filters);
  };

  const [categorys, setCategorys] = useState([{}]);

  useEffect(()=>{
    axios.get('/category/all').then((res)=>{
     setCategorys(res.data.categories);
    }).catch((err)=>console.log(err))
  },[]);

  // Set initial filter sidebar position
  useEffect(() => {
    gsap.set(filterRef.current, {
      x: -300,
    });
  }, []);

  // Sidebar animation
  useEffect(() => {
    if (filterRef.current) {
      if (showFilter) {
        gsap.to(filterRef.current, {
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          opacity: 1,
        });
      } else {
        gsap.to(filterRef.current, {
          x: -300,
          duration: 0.6,
          ease: "power3.in",
          opacity: 0,
        });
      }
    }
  }, [showFilter]);

  // Entry animations for text, search, and category
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      [text1Ref.current, searchRef.current],
      { opacity: 0, y: 30 },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power4.out",
      }
    );

    tl.fromTo(
      categoryRef.current,
      { opacity: 0, y: 300 },
      {
        duration: 2,
        y: 0,
        opacity: 1,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#f9f9f9] relative pt-36 overflow-hidden text-gray-900">
      <Navbar/>
      <div className="bg-">
        {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="fixed top-28 left-6 z-[9999] p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
      >
        <RiFilter3Line size={24} className="text-gray-700" />
      </button>

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
            className="text-center productpage-text1 text-4xl font-bold mb-6 text-gray-800"
          >
            Explore Collections
          </h3>

          {/* Search Bar */}
          <div ref={searchRef} className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search category..."
              className="w-full max-w-md px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>

          {/* Categories Section */}
          <div ref={categoryRef}>
           {categorys.map((category)=>{
            return <Categories category= {category}/>
           })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProductsPage;
