import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import MyMap from '../Components/MyMap'
import { LanguageContext } from '../context/LanguageContext'

function About() {
  const { language, setLanguage }  = useContext(LanguageContext)
  
  
  return (
    <div className='min-h-screen w-screen relative '>
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <div className="page1 min-h-screen w-full pt-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center my-16">
            <p className="text-lg font-semibold  md:max-w-3xl mx-auto about-tag">
              {language === 'en' 
                ? 'Where tradition meets artistry in costume design'
                : 'जिथे परंपरा आणि कलात्मकता वेशभूषा डिझाइनमध्ये एकत्र येतात'}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 md:px-32">



          <div className="bg-white rounded-lg shadow-lg p-8 ">
            {/* <video src="./videos/about1.mp4" controls ></video> */}
            <img src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778881/about2_fhodeb.jpg" alt="" />
            </div>
            {/* Text Content */}
            <div className="">
             
              <div className=" rounded-lg  p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {language === 'en' ? 'What is Roopdarshan?' : 'रूपदर्शन म्हणजे काय?'}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed ">
                  <p>
                    {language === 'en'
                      ? `A character or concept determines its own 'Roop' (form). And it's the costume that makes that form appear exactly in front of the audience. That means, it's a costume that delivers the 'Darshan' - the intangible presentation of that 'Roop' of a character or concept!`
                      : `कोणतीही व्यक्तिरेखा किंवा संकल्पना स्वतःचे रूप ठरवते. वेशभूषा त्या रूपाला प्रेक्षकांसमोर नेमके उभे करते — म्हणजेच वेशभूषाच त्या व्यक्तिरेखेचा किंवा संकल्पनेचा 'दर्शन' घडवते. आम्ही तेच 'रूपदर्शन' आहोत.`}
                  </p>
                  <p>
                    {language === 'en'
                      ? `And that's what we are... 'RoopDarshan'. While delivering an appropriate appearance with respect to character or concept, it's a classic journey starting from head up to nails.`
                      : `साजेसं रूप निर्माण करण्याची ही एक संपूर्ण प्रक्रिया आहे — डोक्यापासून नखांपर्यंतचा एक अभिजात प्रवास.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Random Clothes Section */}
           
          </div>

          {/* Videos Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {language === 'en' ? 'Video Showcase' : 'व्हिडिओ प्रदर्शन'}
            </h2>
            <div className="w-screen flex justify-center items-center gap-[5vw] flex-wrap">
  <video 
    src="https://res.cloudinary.com/dm1lsindg/video/upload/v1763707372/about1_ekb2eh.mp4" 
    controls 
    controlsList="nodownload noplaybackrate"
    muted 
    autoPlay 
    className="w-[25%]"
  ></video>

  <video 
    src="https://res.cloudinary.com/dm1lsindg/video/upload/v1763707583/about2_s0amd9.mp4" 
    controls 
    controlsList="nodownload noplaybackrate"
    muted 
    autoPlay 
    className="w-[25%]"
  ></video>

  <video 
    src="https://res.cloudinary.com/dm1lsindg/video/upload/v1763707353/about3_mjpzjt.mp4" 
    controls 
    controlsList="nodownload noplaybackrate"
    muted 
    autoPlay 
    className="w-[25%]"
  ></video>
</div>

          </div>

          
        </div>
      </div>

      {/* Map Section */}
      <div className="map w-full bg-white md:py-12 pb-[70vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {language === 'en' ? 'Visit Us' : 'आम्हाला भेट द्या'}
          </h2>
          <div className="contact flex gap-14">
          <div className="map w-[50%] ">
          <MyMap />
          </div>
          <div className="details flex flex-col gap-2 tracking-wide leading-relaxed text-gray-800">

<h2 className="text-2xl font-bold mb-3 tracking-wider">
  Roopdarshan
</h2>

<div className="flex flex-col">
  <span className="font-semibold">Address:</span>
  <span>Roopdarshan Apartment</span>
  <span>117 B, Sawarkar Marg, Shukrawar Peth</span>
  <span>Satara, Maharashtra 415002</span>
  <span>India</span>
</div>

<div className="mt-3 flex flex-col gap-1">
  <span className="font-semibold">Phone:</span>
  <span>02162-280001 / 282827</span>
</div>

<div className="flex flex-col gap-1">
  <span className="font-semibold">Mobile:</span>
  <span>9561000027</span>
</div>

</div>


          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}

export default About
