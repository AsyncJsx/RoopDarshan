import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Banner({ language }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imgRefs = useRef([]);

  imgRefs.current = [];

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Title animation on scroll
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%', // when top of title hits 80% of viewport
      }
    });

    // Description animation on scroll
    gsap.from(descRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: descRef.current,
        start: 'top 80%',
      }
    });

    // Images animation on scroll
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
        }
      });
    });
  }, []);


  useEffect(() => {
    gsap.to(titleRef.current, {
      y: '-40%',
      ease: 'none',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  
    gsap.to(descRef.current, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: descRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  
    imgRefs.current.forEach((img, i) => {
      gsap.to(img, {
        y: -30 - i * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, []);
  

  return (
    <div className='h-screen w-full relative p-20 overflow-hidden'>
      <div className="banner-title flex w-full justify-between overflow-hidden">
        <div ref={titleRef} className='text-5xl text-white tracking-wide w-[620px] '>
          <h3>{language === 'en' ? "Unleash Elegance" : 'शोभा उजागर करा'},</h3>
          <h3>{language === 'en' ? 'Redefine Comfort' : "आरामाची नवी व्याख्या"}</h3>
        </div>
        <h3 ref={descRef} className='text-white text-xl w-[40%] text-end'>
          {language === 'en' 
            ? "At Roopdarshan, we don’t just design costumes—we bring characters to life. Blending art, culture, and creativity, we transform imagination into visual reality. Because every form deserves a soul, and every story deserves Roopdarshan."
            : "रूपदर्शनमध्ये आम्ही फक्त वेशभूषा डिझाइन करत नाही, आम्ही व्यक्तिरेखा जिवंत करतो. कला, संस्कृती आणि सर्जनशीलतेला मिसळून, कल्पनांना दृश्यात्मक वास्तवात रूपांतरित करतो. कारण प्रत्येक रूपाला आत्मा हवा असतो, आणि प्रत्येक कथेला ‘रूपदर्शन’ हवे असते."
          }
        </h3>
      </div>

      <div className="img flex justify-evenly mt-24">
        <div
          ref={addToRefs}
          className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer relative"
          style={{ backgroundImage: "url('./b4.jpg')" }}
        />
        <div
          ref={addToRefs}
          className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer"
          style={{ backgroundImage: "url('./b5.jpg')" }}
        />
        <div
          ref={addToRefs}
          className="h-[430px] w-[380px] bg-cover bg-center rounded-xl cursor-pointer"
          style={{ backgroundImage: "url('./b3.jpg')" }}
        />
      </div>
    </div>
  );
}

export default Banner;
