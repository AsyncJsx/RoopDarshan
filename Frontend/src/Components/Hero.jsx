import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Hero({ language }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main heading
      gsap.from(".hero-text1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-text1",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate right side text
      gsap.from(".hero-text3", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-text3",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate images
      gsap.from(".left .img", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".left .img",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".right .img", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".right .img",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, heroRef);

    return () => ctx.revert(); // cleanup
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading scroll speed (slower than scroll)
      gsap.to(".hero-text1", {
        y: -30, // move upward
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-text1",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // controls speed (0.5 = slower than scroll, 1 = synced)
        },
      });

      // Right text scroll speed (faster than scroll)
      gsap.to(".hero-text3", {
        y:-50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-text3",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // faster scroll effect
        },
      });

      // Left image parallax effect
      gsap.to(".left .img", {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".left .img",
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // synced with scroll
        },
      });

      // Right image parallax effect
      gsap.to(".right .img", {
        y: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".right .img",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8, // slower than scroll
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={heroRef} className="md:h-[110vh] h-[60vh] w-screen flex items-center justify-center relative md:p-20 px-6 mt-32 md:mt-0">
      <div className="contianer w-full h-full bg-[#fefafa] flex relative gap-[5vw]">
        <div className="left w-[50%] flex flex-col md:p-12">
          <h3 className="hero-text1 md:text-6xl text-xl text-black">
            {language === "en"
              ? "Timeless Elegance Modern Design -"
              : "जुन्या कालातिल शोभा , आधुनिक डिझाइन -"}
          </h3>
          <div className="img absolute md:bottom-[10%] bottom-[30%] md:left-[5%] left-0">
            <img src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778891/h1_lancdg.jpg" className="md:h-[300px] h-[40vw]" alt="" />
            <div className="hero-text2 flex justify-between items-center text-black text-sm py-2">
              <p className="hover:underline cursor-pointer">
                {language === "en" ? "View More" : "अधिक पहा"}
              </p>
              <p className="md:text-[10px] text-[8px]">{language === "en" ? "Saree" : "साडी"}</p>
            </div>
          </div>
        </div>

        <div className="right w-[50%] flex flex-col md:p-12">
          <div className="hero-text3 md:text-xl text-[10px] text-black">
            <h3>
              {language === "en"
                ? `Roopdarshan is not just a name. It’s a commitment! Everyday efforts for the same to live with. The efforts will receive the response, is what we believe. At Roopdarshan we feel fortunate that our motive of; and for living is same, as said by P. L. Deshpande! Yours Roopdarshan!`
                : `रूपदर्शन – फक्त नाव नाही, अनुभव आणि शैलीचा अनुभव!
रूपदर्शनमध्ये आम्ही प्रत्येक दिवशी प्रामाणिक प्रयत्न करतो, तुमच्या सौंदर्याला व तुमच्या व्यक्तिमत्त्वाला शोभणारे उत्कृष्ट कपडे सादर करण्यासाठी. आमची कटिबद्धता म्हणजे फक्त कपडे देणे नाही, तर तुमच्या जीवनशैलीला आणि तुमच्या खास क्षणांना शोभा देणारा अनुभव देणे.

पु. ल. देशपांडेंप्रमाणे, आमचे ध्येय एक आहे – तुमचं रूपदर्शन, तुमची शैली, तुमची खूबसूरती उंचावणे!`}
            </h3>
          </div>
          <div className="img absolute md:bottom-[1%] bottom-[30%] md:right-[8%] right-0">
            <img src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778900/h2_rkpree.jpg" className="md:h-[350px] h-[40vw] md:w-[530px] object-cover" alt="" />
            <div className="hero-text2 flex justify-between items-center text-white text-sm py-2">
              <Link to={'/products'} className="hover:underline cursor-pointer">
                {language === "en" ? "View More" : "अधिक पहा"}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-black h-0.5 opacity-65 absolute bottom-[10%] md:bottom-0"></div>
      </div>
    </div>
  );
}

export default Hero;
