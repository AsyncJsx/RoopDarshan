import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import gsap from 'gsap';
 
function LandingPage({language}) {
  const navRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  const box1imgRef = useRef(null);
  const box2imgRef = useRef(null);
  const box3imgRef = useRef(null);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(()=>{
   
      gsap.set(text1Ref.current,{
        opacity:0,
        y: -300,
      });
      gsap.set(text2Ref.current,{
        opacity:0,
        y: -300,
      });
    
      

  },[])

  useEffect(() => {
    const tl = gsap.timeline();
   tl.fromTo(
      [box1imgRef.current, box2imgRef.current, box3imgRef.current],
      {
        clipPath: "inset(100% 0% 0% 0%)", // fully hidden from bottom
      },
      {
        delay:0.7,
        clipPath: "inset(0% 0% 0% 0%)", // fully visible
        duration: 2,
        ease: "power4.out",
       
      }
    );
    tl.to(box1Ref.current, {
      x: -1000,
      duration: 2,
    });
    
    tl.to(box3Ref.current, {
      x: 1000,
      duration: 2,
    }, "-=2");
    tl.to(box2Ref.current,{
      width : "90vw",
      height :"85vh",
      left: "5%",
      duration:1,
      top:"7%",
    },'-=2')
   tl.fromTo(
      navRef.current,
      {
        opacity: 0,
        top: "15% !important",
      },
      {
        opacity: 1,
        top: "8% !important",
        duration: 1.2,
        ease: "power3.out",
      },"-=0.5"
    );
    tl.fromTo(
      text1Ref.current,
      {
        opacity: 0,
        y: 50, // start slightly below
      },
      {
        opacity: 1,
        y: 0,   // final position
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, // each text comes after the previous
      },"-=2"
    );
   
   
  
  }, []);
  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.fromTo(
      text3Ref.current,
      {
        opacity: 0,
        y: 50,
      },
      { delay:5,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },"-=1"
    );
  
    const upperCircle = text3Ref.current.querySelector("div:first-child");
  
    tl.fromTo(
      upperCircle,
      {
        y: 86,
      },
      {
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );
    tl.fromTo(
      text2Ref.current,
      {
        opacity: 0,
        y: 50, // start slightly below
      },
      {
        opacity: 1,
        y: 0,   // final position
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, // each text comes after the previous
      }
    );
  }, []);
  
  
  return (
    <div className='h-screen w-full flex relative overflow-hidden items-center justify-center'>
      <div className=' w-full z-[99999]' ref={navRef}>
      <Navbar/>
      </div>
      {/* Box 1 */}
      <div ref={box1Ref} className="box h-[65vh] w-[20%] border-2 border-white/10 absolute bottom-[20%] left-[15%] overflow-hidden  ">
        <img
          ref={box1imgRef}
          src="./landing1.jpg"
          className="absolute w-full h-full object-contain scale-125"
          alt="Landing 1"
        />
      </div>

      {/* Box 2 */}
      {/* div className="box h-[85vh] w-[90%] border border-black/20 absolute bottom-[20%] left-[5%] top-[7%] overflow-hidden  " */}
      <div ref={box2Ref} className="box h-[65vh] w-[20%]  border-2 border-white/10 absolute bottom-[20%] left-[40%]  overflow-hidden  ">
        <img
           ref={box2imgRef}
          src="./l2.jpg"
          className="absolute w-full h-full object-cover  "
          alt="Landing 2"
        />
      </div>

      {/* Box 3 */}
      <div ref={box3Ref} className="box h-[65vh] w-[20%] border-2 border-white/10 absolute bottom-[20%] left-[65%] overflow-hidden ">
        <img
          ref={box3imgRef}
          src="./landing3.jpg"
          className="absolute w-full h-full object-contain scale-125"
          alt="Landing 3"
        />
      </div>

      <h4 ref={text1Ref}  className='landing-text1 text-6xl text-white absolute z-[50] bottom-[20%] left-32 w-[650px] tracking-wide overflow-hidden'>
      {language === "en"
  ? "Exclusive Collections for Every Occasion"
  : "प्रत्येक प्रसंगासाठी खास संग्रह"}

      </h4>

      <div ref={text2Ref} className='landing-text2 text-8xl text-[#fdf4f4] z-[50] absolute tracking-wider font-sans right-[15%]'>
      {language === "en" ? (
  <>
    <h2>Bringing</h2>
    <h3 className="pl-12">Art Alive.</h3>
  </>
) : (
  <><h2 className='font-extralight'>रूपाची</h2>
  <h3 className='font-extralight'>नवी ओळख.</h3>
  
  </>
)}

      </div>

      <div ref={text3Ref} class="flex flex-col items-center text-white z-60 absolute right-[30%] bottom-[9%]">

  <div class="w-28 h-28 border border-white rounded-full flex items-center justify-center text-lg font-semibold relative">
  {language === "en"
  ? "Scrolling"
  : " स्क्रोल करा"}
    
  </div>
 

  <div class="w-28 h-28 rounded-full flex items-center justify-center -mt-6  relative">
    <div class="w-full h-full border border-white rounded-full flex items-center justify-center">
      <i class="ri-arrow-down-double-line text-2xl"></i>
    </div>
  </div>

</div>


      
    </div>
  )
}

export default LandingPage
