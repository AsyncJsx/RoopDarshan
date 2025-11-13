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

  return (
    <div className="fixed md:top-[10%] top-[5%] z-[9999] w-screen md:px-36 flex items-center justify-between text-black px-[10vw]">
      {/* Left: Contact Info */}
      <div className="flex items-center md:gap-3 font-thin">
        <div className="flex items-center md:gap-2 md:flex-row flex-col">
          <h2 className="text-[10px] md:text-xl">
            <i className="ri-phone-line text-sm md:text-xl"></i>
            {language === "en" ? " Contact" : " संपर्क"}
          </h2>
          <h2 className="text-[10px] md:text-xl">917498811073</h2>
        </div>
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
        <img src="/logo-black.png" className="h-32" alt="Logo" />
      </div>

      {/* Right: Desktop Icons */}
      <div className="md:flex items-center text-xl gap-4 hidden">
        <Link to="/search" className="ri-search-line hover:scale-105 transition"></Link>
        <Link to="/" className="ri-home-4-line hover:scale-105 transition"></Link>
        <Link to="/products" className="ri-t-shirt-line hover:scale-105 transition"></Link>
        <Link to="/about" className="ri-information-line hover:scale-105 transition"></Link>

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
        className={`absolute top-[100%] left-4 w-full text-black text-xl flex items-center justify-center gap-5 py-4 shadow-md md:hidden ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <Link to="/search" onClick={() => setMenuOpen(false)} className="ri-search-line"></Link>
        <Link to="/" onClick={() => setMenuOpen(false)} className="ri-home-4-line"></Link>
        <Link to="/products" onClick={() => setMenuOpen(false)} className="ri-t-shirt-line"></Link>
        <Link to="/about" onClick={() => setMenuOpen(false)} className="ri-information-line"></Link>

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
