import React from 'react'

function Footer({ language }) {
  return (
    <div className='w-full flex flex-col items-center bg-black text-gray-200 py-10'>
      {/* Main Footer */}
      <footer className="w-[80vw] text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 justify-between">

          {/* Address */}
          <div className="space-y-1">
            <h3 className="text-base font-semibold">{language === "en" ? "Roopdarshan Apartment" : "रूपदर्शन अपार्टमेंट"}</h3>
            <address className="not-italic text-gray-300 leading-relaxed">
              117 b, {language === "en" ? "Sawarkar Marg" : "सावरकर मार्ग"},<br />
              {language === "en" ? "Shukrawar Peth" : "शुक्रवार पेठ"}, Satara,<br />
              Maharashtra 415002<br />
              India
            </address>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-center">
            <ul className="flex gap-6 text-gray-300 text-sm">
              <li><a href="/shop" className="hover:text-white">{language === "en" ? "Shop" : "दुकान"}</a></li>
              <li><a href="/about" className="hover:text-white">{language === "en" ? "About" : "आमच्याबद्दल"}</a></li>
              <li><a href="/contact" className="hover:text-white">{language === "en" ? "Contact" : "संपर्क"}</a></li>
            </ul>
            <p className="text-xs text-gray-400 mt-3">
              {language === "en" ? "Handcrafted traditional elegance." : "हाताने बनवलेली पारंपरिक शोभा."}
            </p>
          </nav>

          {/* Contact */}
          <div className="space-y-1 text-right md:text-left">
            <div className="flex items-center justify-end md:justify-start gap-3">
              <i className="ri-phone-line text-gray-400"></i>
              <div>
                <div className="text-gray-200 font-medium">{language === "en" ? "Phone" : "फोन"}</div>
                <div className="text-gray-300 text-xs">02162-280001 / 282827</div>
              </div>
            </div>

            <div className="flex items-center justify-end md:justify-start gap-3 mt-2">
              <i className="ri-smartphone-line text-gray-400"></i>
              <div>
                <div className="text-gray-200 font-medium">{language === "en" ? "Mobile" : "मोबाइल"}</div>
                <div className="text-gray-300 text-xs">+91 95610 00027</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-8">
          <img src="./logo.png" alt="Roopdarshan Logo" className="h-14 opacity-90" />
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Roopdarshan — {language === "en" ? "All rights reserved." : "सर्व हक्क राखीव."}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
