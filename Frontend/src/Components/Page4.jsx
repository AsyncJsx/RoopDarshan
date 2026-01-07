import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Page4({ language }) {
  const textRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useEffect(() => {
    // Text animation: bottom → up with clip-path
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });

    // Image animations: top → down with opacity
    [img1Ref, img2Ref, img3Ref].forEach((imgRef, i) => {
      gsap.from(imgRef.current, {
        y: -500,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 85%',
          end: 'bottom 70%',
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className='xl:h-screen w-full flex items-center justify-center xl:p-20 px-6 md:mt-0 mt-[-40vw]'>
      <div ref={textRef} className="content text-black font-bold xl:text-3xl text-xl text-center xl:px-20 leading-[2.5rem] tracking-wider">
        <span className="align-middle">
          {language === "en" 
            ? <>
                At Roopdarshan,
                <span
                  ref={img1Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767778988/shop-img_dc85ln.jpg')" }}
                  className="inline-block h-12 w-20 bg-cover bg-center rounded-full align-middle mx-2"
                ></span>
                we believe costumes are not just clothing but an expression of character and emotion.
                <span
                  ref={img2Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767778904/p2_sb131w.png')" }}
                  className="inline-block h-16 w-24 bg-contain bg-no-repeat bg-center align-middle mx-2 -mt-6"
                ></span>
                From drama to dance, we bring every concept to life through detailed costumes, wigs, ornaments and accessories.
                <span
                  ref={img3Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767779756/landing2_dayi0j.jpg')" }}
                  className="inline-block h-10 w-20 bg-cover bg-center rounded-full align-middle mx-2"
                ></span>
                We turn imagination into visual reality—because appearance completes the art.
              </>
            : <div className='leading-14'>
                रूपदर्शनमध्ये,
                <span
                  ref={img1Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767778988/shop-img_dc85ln.jpg')" }}
                  className="inline-block h-12 w-20 bg-cover bg-center rounded-full align-middle mx-2 -mt-6"
                ></span>
                आम्ही मानतो की वेशभूषा फक्त कपडे नाहीत, तर व्यक्तिरेखा आणि भावनांचा अभिव्यक्ती माध्यम आहेत.
                <span
                  ref={img2Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767778904/p2_sb131w.png')" }}
                  className="inline-block h-16 w-24 bg-contain bg-no-repeat bg-center align-middle mx-2 -mt-12"
                ></span>
                नाट्यापासून नृत्यापर्यंत, आम्ही प्रत्येक संकल्पना वेशभूषा, विग, दागिने आणि अॅक्सेसरीजद्वारे जिवंत करतो.
                <span
                  ref={img3Ref}
                  style={{ backgroundImage: "url('https://res.cloudinary.com/dm1lsindg/image/upload/v1767779756/landing2_dayi0j.jpg')" }}
                  className="inline-block h-10 w-20 bg-cover bg-center rounded-full align-middle mx-2 -mt-4"
                ></span>
                आम्ही कल्पनांना दृश्यात्मक वास्तवात रूपांतरित करतो
              </div>
          }
        </span>
      </div>
    </div>
  );
}

export default Page4;
