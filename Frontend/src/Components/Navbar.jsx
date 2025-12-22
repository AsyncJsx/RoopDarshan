import React, { useContext, useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // GSAP animation for menu slide-down
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, { y: -50, opacity: 0, duration: 0.4, ease: "power3.in" });
    }
  }, [menuOpen]);
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
    <div className="navbar fixed md:top-[5%] top-[5%] z-[9999] w-screen md:px-32 flex items-center justify-between text-black px-[3vw]">

<div className=" cursor-pointer ">
        <img src="/logo-black.png" className="md:h-20 h-12" alt="Logo" />
      </div>
      {/* Left: Contact Info */}
      <div className="flex items-center md:gap-3 font-thin absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center md:gap-2 md:flex-row flex-col">
          <h2 className="text-[10px] md:text-xl">
            <i className="ri-phone-line text-sm md:text-xl"></i>
            {language === "en" ? " Contact" : " संपर्क"}
          </h2>
          <h2 className="text-[10px] md:text-lg">9561000027</h2>
        </div>
      </div>

      {/* Center: Logo */}
      

      {/* Right: Desktop Icons */}
      <div className="md:flex items-center text-xl gap-4 hidden">
        <Link to="/search" className="ri-search-line link hover:scale-105 transition text-lg">
        Search</Link>
        <Link to="/" className="ri-home-4-line link hover:scale-105 transition text-lg">
        Home</Link>
        <Link to="/products" className="ri-t-shirt-line link hover:scale-105 transition text-lg">
        Products</Link>
        <Link to="/about" className="ri-information-line link hover:scale-105 transition text-lg">
        About</Link>

        {/* Language Dropdown */}
        <div className="flex items-center gap-1">
          <i className="ri-global-line"></i>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-black text-sm cursor-pointer outline-none border-none focus:ring-0"
          >
            <option value="en">Eng</option>
            <option value="mr">Mar</option>
          </select>
        </div>

        <Link to="/admin/dashboard" className="ri-admin-line hover:text-red-800 transition"></Link>
      </div>

      {/* Right: Mobile Menu Icon */}
      <div className="md:hidden flex items-center gap-3">
        <i
          className={`ri-${menuOpen ? "close-line" : "menu-line"} text-2xl cursor-pointer transition`}
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>
        <Link
          to="/admin/dashboard"
          className="ri-admin-line hover:text-red-800 hover:scale-105 transition"
        ></Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`absolute top-[100%] left-4 w-full text-black text-xl flex items-center justify-center gap-2 py-4 shadow-md md:hidden ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <Link to="/search" className=" flex items-center justify-center" onClick={() => setMenuOpen(false)} >
        <i className="ri-search-line"></i>
        <p className=" text-sm">Search</p>
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)} className=" flex items-center justify-center">
        <i className="ri-home-4-line"></i>
        <p className=" text-sm">Home</p>
        </Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}  className=" flex items-center justify-center">
        <i className="ri-t-shirt-line"></i>
        <p className="text-sm">Product</p></Link>
        <Link to="/about" onClick={() => setMenuOpen(false)} className=" flex items-center justify-center" >
        <i className="ri-information-line"></i>
        <p className=" text-sm">About</p></Link>

        {/* Language Dropdown */}
        <div className="flex items-center gap-1">
          <i className="ri-global-line"></i>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-black text-sm cursor-pointer outline-none border-none"
          >
            <option value="en">Eng</option>
            <option value="mr">Mar</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
