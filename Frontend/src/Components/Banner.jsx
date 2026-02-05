import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

function Banner({ language }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imgRefs = useRef([]);
  const videoRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  videoRefs.current = []; // reset before render

  useEffect(() => {
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
    <div className="min-h-screen w-full relative md:p-20 p-6 overflow-hidden">
      {/* Text Section */}
      <div className="banner-title flex w-full justify-between overflow-hidden">
        <div
          ref={titleRef}
          className="md:text-5xl text-xl text-black tracking-wide md:w-[620px] w-[80vw]"
        >
          <h3>{language === 'en' ? 'Unleash Elegance' : 'शोभा उजागर करा'},</h3>
          <h3>{language === 'en' ? 'Redefine Comfort' : 'आरामाची नवी व्याख्या'}</h3>
        </div>

        <h3
          ref={descRef}
          className="text-black md:text-xl text-[10px] md:w-[40%] w-[60vw] text-end"
        >
          {language === 'en'
            ? "At Roopdarshan, we don’t just design costumes—we bring characters to life. Blending art, culture, and creativity, we transform imagination into visual reality."
            : "रूपदर्शनमध्ये आम्ही फक्त वेशभूषा डिझाइन करत नाही, आम्ही व्यक्तिरेखा जिवंत करतो."}
        </h3>
      </div>

      {/* Image + Video Grid */}
      <div className="img flex justify-evenly mt-24 gap-8">
        {[
          {
            img: 'https://res.cloudinary.com/dm1lsindg/image/upload/v1767778888/b4_ly72aj.jpg',
            video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035704/v1_vstcif.mp4',
          },
          {
            img: 'https://res.cloudinary.com/dm1lsindg/image/upload/v1767778899/b5_avthes.webp',
            video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035704/v2_h2epk5.mp4',
          },
          {
            img: 'https://res.cloudinary.com/dm1lsindg/image/upload/v1767778890/b3_qxgyqi.jpg',
            video: 'https://res.cloudinary.com/dm1lsindg/video/upload/v1763035767/v3_bzb2e1.mp4',
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="relative md:h-[430px] h-[20vh] w-[30vw] md:w-[380px] rounded-xl overflow-hidden group cursor-pointer"
          >
            {/* IMAGE LAYER */}
            <div
              className="absolute inset-0 bg-cover bg-center rounded-xl z-20 transition-opacity duration-700 group-hover:opacity-0"
              style={{ backgroundImage: `url(${item.img})` }}
            />

            {/* VIDEO LAYER */}
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={item.video}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-xl z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              onMouseEnter={() => {
                const vid = videoRefs.current[i];
                if (!vid) return;
                vid.muted = false;
                vid.currentTime = 0;
                vid.play();
              }}
              onMouseLeave={() => {
                const vid = videoRefs.current[i];
                if (!vid) return;
                vid.muted = true;
                vid.pause();
              }}
            />

            {/* LOGO (NOT for middle card) */}
            {i !== 1 && (
              <img
                src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778975/logo_fdy5er.png"
                alt="Logo"
                className="absolute inset-0 m-auto w-24 h-24 scale-150 object-contain z-30 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}
          </div>
        ))}
      </div>

      {/* Link */}
      <Link
        to="/products"
        className="link flex items-center gap-2 absolute xl:bottom-[10%] bottom-[33%] right-[5%] text-black cursor-pointer"
      >
        <h3 className="hover:underline">
          {language === 'en' ? 'Keep Exploring' : 'सर्व वर्ग'}
        </h3>
        <i className="ri-arrow-right-long-line hover:-rotate-45"></i>
      </Link>

      <div className="w-full bg-black h-0.5 opacity-65 md:mt-24 absolute xl:static bottom-[30%]" />
    </div>
  );
}

export default Banner;
