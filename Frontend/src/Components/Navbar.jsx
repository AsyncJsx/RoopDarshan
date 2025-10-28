import React, { useContext } from 'react'
import 'remixicon/fonts/remixicon.css'
import { LanguageContext } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

function Navbar() {

  const { language, setLanguage } = useContext(LanguageContext)

  return (
    <div className="fixed top-[10%] z-[9999] w-screen px-36 flex items-center justify-between text-white">
      {/* Left: Contact Info */}
      <div className="flex items-center gap-3 font-thin">
        <i className="ri-phone-line"></i>
        <div className="flex items-center gap-2">
          <h2>
            {
              language == "en" ? " Contact" : "संपर्क"
            }
           </h2>
          <h2>917498811073</h2>
        </div>
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="./logo.png" className="h-16" alt="Logo" />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center text-xl gap-4">
        <i className="ri-search-line hover:text-pink-400 transition"></i>
        <i className="ri-home-4-line hover:text-pink-400 transition"></i>
        <i className="ri-t-shirt-line hover:text-pink-400 transition"></i>
        <Link to={'/about'} className="ri-information-line hover:text-pink-400 transition"></Link>

        {/* Language Dropdown */}
        <div className="flex items-center gap-1">
  <i className="ri-global-line"></i>
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="bg-transparent text-white text-sm cursor-pointer outline-none border-none focus:ring-0"
  >
    <option value="en" className="text-black bg-transparent outline-none border-none focus:ring-0">Eng</option>
    <option value="mr" className="text-black bg-transparent outline-none border-none focus:ring-0">Mar</option>
  </select>
</div>

      </div>
    </div>
  )
}

export default Navbar
