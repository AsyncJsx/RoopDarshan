import React, { useContext, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";


function MiniNavbar() {
  const { language, setLanguage } = useContext(LanguageContext);
 
  const menuRef = useRef(null);

  // GSAP animation for menu slide-down
 
  

  return (
    <div className="navbar absolute md:top-[10%] top-[65%] z-[9999] w-screen md:px-32 flex items-center justify-end text-black px-[5vw] ">


      
      <div className="flex md:flex-col flex-col-reverse items-end justify-center gap-[1vw]">
      <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-2 md:gap-[2vw] ">
      <div className="flex items-center gap-2 ">
          <h2 className="text-[12px] md:text-xl links">
            <i className="ri-phone-line text-sm md:text-xl"></i>
            {language === "en" ? " Contact" : " संपर्क"}
          </h2>
          <h2 className="text-[12px] md:text-lg md:mt-0 mt-1 links md:tracking-normal tracking-wider md:pr-0 pr-3 font-semibold">9561000027</h2>
        </div>
        <div className="flex items-center gap-2 ">
          <Link to='/gallary' className="text-[12px] md:text-lg links flex gap-2 hover:scale-105">
            <i className="ri-video-ai-line text-sm md:text-lg"></i>
           <p className="links text-[13px] md:text-lg">{language === "en" ? "Video Gallery" : "व्हिडिओ गॅलरी"}</p>
          </Link>
          
        </div>
        </div>
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

      <div className="md:flex items-center md:text-lg text-sm md:gap-4 gap-2 hidden  ">
        <a href="https://www.instagram.com/roupdarshanrentalhub/"className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/instagram_cno9jk.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>

          <a href="https://www.facebook.com/share/18CKjVnAFw/" className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/facebook_zhbwg8.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>
          
          
          <a
  href="https://jsdl.in/DT-9971EN5L"
  className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885267/jdlogo_nkhcbo.png')] bg-cover bg-center bg-no-repeat
             px-4 py-2 rounded-md"
>
 
</a>

          <a href="https://youtube.com/@rupdarshan?si=jsK3KOB1GHBrDot4" className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/youtube_oayjqv.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>

          
          
        
        
        
        

        {/* Language Dropdown */}
      
      </div>

      </div>
      {/* Right: Mobile Menu Icon */}
      
    </div>
  );
}

export default MiniNavbar;
