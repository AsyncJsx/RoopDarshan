import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Banner({ language }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imgRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Title and text animations
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
    });

    gsap.from(descRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: descRef.current,
        start: 'top 80%',
      },
    });

    // Image scale animation
    imgRefs.current.forEach((img, i) => {
      gsap.from(img, {
        scale: 1.3,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-full relative md:p-20 p-6 overflow-hidden ">
      <div className="banner-title flex w-full justify-between overflow-hidden">
        <div ref={titleRef} className="md:text-5xl text-xl text-black tracking-wide md:w-[620px] w-[80vw]">
          <h3>{language === 'en' ? 'Unleash Elegance' : 'शोभा उजागर करा'},</h3>
          <h3>{language === 'en' ? 'Redefine Comfort' : 'आरामाची नवी व्याख्या'}</h3>
        </div>
        <h3 ref={descRef} className="text-black md:text-xl text-[10px] md:w-[40%] w-[60vw] text-end">
          {language === 'en'
            ? "At Roopdarshan, we don’t just design costumes—we bring characters to life. Blending art, culture, and creativity, we transform imagination into visual reality. Because every form deserves a soul, and every story deserves Roopdarshan."
            : "रूपदर्शनमध्ये आम्ही फक्त वेशभूषा डिझाइन करत नाही, आम्ही व्यक्तिरेखा जिवंत करतो. कला, संस्कृती आणि सर्जनशीलतेला मिसळून, कल्पनांना दृश्यात्मक वास्तवात रूपांतरित करतो. कारण प्रत्येक रूपाला आत्मा हवा असतो, आणि प्रत्येक कथेला ‘रूपदर्शन’ हवे असते."}
        </h3>
      </div>

      {/* Image and Video Grid */}
      <div className="img flex justify-evenly mt-24 gap-8">
  {[
    { img: './b4.jpg', video: './videos/v1.mp4' },
    { img: './b5.jpg', video: './videos/v2.mp4' },
    { img: './b3.jpg', video: './videos/v3.mp4' },
  ].map((item, i) => (
    <div
      key={i}
      ref={addToRefs}
      className="relative md:h-[430px] h-[20vh] w-[30vw] md:w-[380px] rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* Image layer (front initially) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 rounded-xl z-20 group-hover:z-0 group-hover:opacity-0"
        style={{ backgroundImage: `url(${item.img})` }}
      />

      {/* Video layer (hidden behind until hover) */}
      <video
        src={item.video}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover rounded-xl z-0 opacity-0 transition-all duration-700 group-hover:z-20 group-hover:opacity-100"
      />

      {/* Centered logo — appears only on hover */}
     {i == 1 ? '':  <img
        src="./logo.png"
        alt="Logo"
        className="absolute inset-0 m-auto w-24 h-24 object-contain z-30 opacity-0 transition-all duration-700 group-hover:opacity-100"
      />}
    </div>
  ))}
</div>
<div className="link flex items-center gap-2 absolute xl:bottom-[10%] bottom-[33%] right-[5%] text-black cursor-pointer ">
    <h3 className="hover:underline">
      {language === 'en' ? 'Keep Exploring' : 'सर्व वर्ग'}
    </h3>
    <i className="ri-arrow-right-long-line hover:-rotate-45"></i>
  </div>
<div className="w-full bg-black h-0.5 opacity-65 md:mt-24 absolute xl:static bottom-[30%]"></div>



    </div>
  );
}

export default Banner;