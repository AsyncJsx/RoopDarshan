import React, { useContext, useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
 
  const menuRef = useRef(null);

  // GSAP animation for menu slide-down
 
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.querySelector(".navbar");

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
    <div className="navbar fixed md:top-[10%] top-[75%] z-[9999] w-screen md:px-32 flex items-center justify-end text-black px-[3vw] ">

{/* <div className=" cursor-pointer ">
        <img src="/logo-black.png" className="md:h-20 h-12" alt="Logo" />
      </div> */}
      {/* Left: Contact Info */}
      {/* <div className="flex items-center md:gap-3 font-thin absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center md:gap-2 md:flex-row flex-col">
          <h2 className="text-[10px] md:text-xl">
            <i className="ri-phone-line text-sm md:text-xl"></i>
            {language === "en" ? " Contact" : " संपर्क"}
          </h2>
          <h2 className="text-[10px] md:text-lg">9561000027</h2>
        </div>
      </div> */}

      {/* Center: Logo */}
      
      <div className="flex md:flex-col flex-col-reverse items-end justify-center gap-[1vw]">
      <div className="flex items-center gap-2 ">
          <h2 className="text-[12px] md:text-xl links">
            <i className="ri-phone-line text-sm md:text-xl"></i>
            {language === "en" ? " Contact" : " संपर्क"}
          </h2>
          <h2 className="text-[12px] md:text-lg md:mt-0 mt-1 links md:tracking-normal tracking-wider md:pr-0 pr-3 font-semibold">9561000027</h2>
        </div>
      {/* Right: Desktop Icons */}
      <div className="flex items-center md:text-lg text-sm md:gap-4 gap-2 ">
        <Link to="/search" className="ri-search-line link hover:scale-105 transition md:text-lg text-sm flex md:gap-1">
        <p className="links text-[13px] md:text-lg">Search
          </p></Link>
        <Link to="/" className="ri-home-4-line link hover:scale-105 transition md:text-lg text-sm flex md:gap-1">
        <p className="links text-[13px] md:text-lg">Home</p>
        </Link>
        <Link to="/products" className="ri-t-shirt-line link hover:scale-105 transition md:text-lg text-sm flex md:gap-1">
        <p className="links text-[13px] md:text-lg">Products</p>
       </Link>
        <Link to="/about" className="ri-information-line link hover:scale-105 transition md:text-lg text-sm flex md:gap-1">
        <p className="links text-[13px] md:text-lg">About</p></Link>

        {/* Language Dropdown */}
        <div className="flex items-center gap-1">
          <i className="ri-global-line"></i>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-black md:text-lg text-[13px] cursor-pointer outline-none border-none focus:ring-0 links"
          >
            <option value="en">Eng</option>
            <option value="mr">Mar</option>
          </select>
        </div>

        <Link to="/admin/dashboard" className="ri-admin-line hover:text-red-800 transition"></Link>
      </div>

      </div>
      {/* Right: Mobile Menu Icon */}
      
    </div>
  );
}

export default Navbar;
