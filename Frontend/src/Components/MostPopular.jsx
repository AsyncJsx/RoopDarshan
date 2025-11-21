import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function MostPopular({ language }) {
  const videoRefs = useRef([]);
  videoRefs.current = []; // reset before render

  const items = [
    {
      img: './banner1.jpeg',
      video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035744/v4_mpyndk.mp4',
      titleEn: 'Signature Jewelry for Every Story',
      titleMr: 'प्रत्येक कथेसाठी खास दागिने',
    },
    {
      img: './banner2.jpeg',
      video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035814/v5_hoffw1.mp4',
      titleEn: 'The Pride of Every Celebration',
      titleMr: 'प्रत्येक उत्सवाचा अभिमान',
    },
    {
      img: './banner3.jpeg',
      video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035749/v6_aintjs.mp4',
      titleEn: 'Every Thread Tells a Story',
      titleMr: 'प्रत्येक धागा एक कथा सांगतो',
    },
  ];

  return (
    <div className='min-h-screen w-full relative xl:p-20 px-6 overflow-hidden md:mt-0 mt-[40vh]'>

      {/* Title */}
      <div className="banner-title flex w-full justify-between gap-[10vw]">
        <h3 className='md:text-5xl text-xl text-black tracking-wide xl:w-[500px] w-[30vw]'>
          {language === "en" ? "Explore Our Best-Selling Categories" : "आमच्या सर्वोत्तम विक्री होणाऱ्या वस्त्रभूषा इथे पहा."}
        </h3>

        <h3 className='text-black xl:text-xl text-[12px] md:w-[40%] w-[60vw] text-end'>
          {language === "en"
            ? "Explore our finest collection trusted by artists nationwide. Premium costumes, accessories, and character essentials. Designed for performance. Made for impact."
            : "आर्टिस्ट्सद्वारे संपूर्ण देशभर विश्वास ठेवलेली आमची उत्कृष्ट संग्रह पाहा. प्रीमियम वेशभूषा, अॅक्सेसरीज आणि व्यक्तिरेखेसाठी आवश्यक वस्तू. कामगिरीसाठी डिझाइन केलेले. प्रभावासाठी बनवलेले."}
        </h3>
      </div>

      {/* Cards */}
      <div className="img flex justify-evenly mt-24 border-b-2 border-black pb-20 gap-[5vw] relative md:static">
        {items.map((item, i) => (
          <div key={i} className="relative group">

            {/* IMG (front) */}
            <div
              className="xl:h-[430px] h-[20vh] xl:w-[380px] w-[25vw] bg-cover bg-center rounded-xl cursor-pointer relative z-20 transition-all duration-700 group-hover:opacity-0"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>

            {/* VIDEO (plays sound on hover) */}
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={item.video}
              loop
              className="absolute inset-0 w-full h-[430px] object-cover rounded-xl z-10 opacity-0 transition-all duration-700 group-hover:opacity-100"
              onMouseEnter={() => {
                const vid = videoRefs.current[i];
                vid.muted = false;
                vid.currentTime = 0;
                vid.play();
              }}
              onMouseLeave={() => {
                const vid = videoRefs.current[i];
                vid.muted = true;
                vid.pause();
              }}
            ></video>

            {/* Logo only for middle card */}
            {i === 1 && (
              <img
                src="./logo.png"
                alt="Logo"
                className="absolute inset-0 m-auto mt-[80%] w-36 h-36 object-contain z-30 opacity-0 transition-all duration-700 group-hover:opacity-100"
              />
            )}

            {/* TEXT BELOW */}
            <div className="description flex md:flex-row flex-col w-full justify-between items-center py-4 text-black">
              <h3 className="text-black md:text-lg text-[10px] font-bold">
                {language === 'en' ? item.titleEn : item.titleMr}
              </h3>
              <h2 className="xl:text-sm text-[8px] cursor-pointer hover:underline font-semibold hover:font-bold">
                {language === 'en' ? 'View More' : 'अधिक पहा'}
              </h2>
            </div>
          </div>
        ))}

        {/* LINK */}
        <Link to={'/products'} className="link flex items-center gap-2 absolute bottom-[10%] right-[5%] text-black cursor-pointer">
          <h3 className="hover:underline">
            {language === 'en' ? 'Explore All Categories' : 'सर्व वर्ग'}
          </h3>
          <i className="ri-arrow-right-long-line hover:-rotate-45"></i>
        </Link>
      </div>

    </div>
  );
}

export default MostPopular;
