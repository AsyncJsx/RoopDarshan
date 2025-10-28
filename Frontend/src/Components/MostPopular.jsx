import React from 'react'

function MostPopular({ language }) {
  return (
    <div className='min-h-screen w-full relative p-20 overflow-hidden'>
      <div className="banner-title flex w-full justify-between">
        <h3 className='text-5xl text-white tracking-wide w-[500px]'>
          {language === "en" ? "Explore Our Best-Selling Categories" : "आमच्या सर्वोत्तम विक्री होणाऱ्या वस्त्रभूषा इथे पहा."}
        </h3>
        <h3 className='text-white text-xl w-[40%] text-end'>
          {language === "en"
            ? "Explore our finest collection trusted by artists nationwide. Premium costumes, accessories, and character essentials. Designed for performance. Made for impact."
            : "आर्टिस्ट्सद्वारे संपूर्ण देशभर विश्वास ठेवलेली आमची उत्कृष्ट संग्रह पाहा. प्रीमियम वेशभूषा, अॅक्सेसरीज आणि व्यक्तिरेखेसाठी आवश्यक वस्तू. कामगिरीसाठी डिझाइन केलेले. प्रभावासाठी बनवलेले."}
        </h3>
      </div>

      <div className="img flex justify-evenly mt-24 border-b-2 border-white pb-20">
        <div className="relative">
          <div
            className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer relative"
            style={{ backgroundImage: "url('./banner1.jpeg')" }}
          ></div>
          <div className="description flex w-full justify-between items-center py-4 text-white">
            <h3 className='text-white text-lg font-bold'>
              {language === "en" ? "Signature Jewelry for Every Story" : "प्रत्येक कथेसाठी खास दागिने"}
            </h3>
            <h2 className='text-sm cursor-pointer hover:underline font-semibold hover:font-bold'>
              {language === "en" ? "View More" : "अधिक पहा"}
            </h2>
          </div>
        </div>

        <div className="relative">
          <div
            className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer relative"
            style={{ backgroundImage: "url('./banner2.jpeg')" }}
          ></div>
          <div className="description flex w-full justify-between items-center py-4 text-white">
            <h3 className='text-white text-lg font-bold'>
              {language === "en" ? "The Pride of Every Celebration" : "प्रत्येक उत्सवाचा अभिमान"}
            </h3>
            <h2 className='text-sm cursor-pointer hover:underline font-semibold hover:font-bold'>
              {language === "en" ? "View More" : "अधिक पहा"}
            </h2>
          </div>
        </div>

        <div className="relative">
          <div
            className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer relative"
            style={{ backgroundImage: "url('./banner3.jpeg')" }}
          ></div>
          <div className="description flex w-full justify-between items-center py-4 text-white">
            <h3 className='text-white text-lg font-bold'>
              {language === "en" ? "Every Thread Tells a Story" : "प्रत्येक धागा एक कथा सांगतो"}
            </h3>
            <h2 className='text-sm cursor-pointer hover:underline font-semibold hover:font-bold'>
              {language === "en" ? "View More" : "अधिक पहा"}
            </h2>
          </div>
        </div>

        <div className='link flex items-center gap-2 absolute bottom-[10%] right-[5%] text-white cursor-pointer'>
          <h3 className='hover:underline'>
            {language === "en" ? "Explore All Categories" : "सर्व वर्ग "}
          </h3>
          <i className="ri-arrow-right-long-line hover:-rotate-45 "></i>
        </div>
      </div>
    </div>
  )
}

export default MostPopular
