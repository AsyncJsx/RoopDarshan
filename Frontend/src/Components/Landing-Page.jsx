import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import MiniNavbar from './MiniNavbar';
 
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
    tl.fromTo(
      text3Ref.current,
      {
        opacity: 0,
        y: 50,
      },
      { delay:1,
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
    <div className='h-screen w-full flex relative overflow-hidden items-center justify-center border-4 md:border-none border-black '>
      <div className=' w-full z-[99999] ' ref={navRef}>
      <MiniNavbar/>
      </div>
      {/* Box 1 */}
      {/* <div ref={box1Ref} className="box h-[65vh] w-[20%] border-2 border-white/10 absolute bottom-[20%] left-[15%] overflow-hidden  ">
        <img
          ref={box1imgRef}
          src="./landing1.jpg"
          className="absolute w-full h-full object-contain scale-125"
          alt="Landing 1"
        />
      </div> */}

      {/* Box 2 */}
      {/* div className="box h-[85vh] w-[90%] border border-black/20 absolute bottom-[20%] left-[5%] top-[7%] overflow-hidden  " */}
      <div  className="box md:h-[100vh] md:w-[30vw] w-full     h-[100vh]  border-2 border-white/10 absolute md:bottom-[5%] bottom-[-1%]  md:left-[8%]  overflow-hidden  ">
        <img
          
          src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778909/pc_yipxhh.png"
          className="absolute w-full md:h-[95%] h-full object-contain md:object-contain opacity-0 md:opacity-100  "
          alt="Landing 2"
        />
       
        <img
          
          src="https://res.cloudinary.com/daai6xwtd/image/upload/v1770722546/l1_jxqvks.jpg"
          className="absolute w-full md:h-[85%] h-[60%] object-cover md:object-cover  md:opacity-0  "
          alt="Landing 2"
        />
      </div>

      {/* Box 3 */}
      {/* <div ref={box3Ref} className="box h-[65vh] w-[20%] border-2 border-white/10 absolute bottom-[20%] left-[65%] overflow-hidden ">
        <img
          ref={box3imgRef}
          src="./landing3.jpg"
          className="absolute w-full h-full object-contain scale-125"
          alt="Landing 3"
        />
      </div> */}
   <div className="flex items-center md:text-lg text-sm md:gap-4 gap-2 absolute md:hidden top-[88%] left-[12%]  ">
        <a href="https://www.instagram.com/roupdarshanrentalhub/"className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/instagram_cno9jk.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>

          <a href="https://www.facebook.com/share/18CKjVnAFw/" className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/facebook_zhbwg8.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>
          
          
          <a
  href="https://jsdl.in/DT-9971EN5L"
  className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885267/jdlogo_nkhcbo.png')] bg-cover bg-center bg-no-repeat
             px-4 py-2 rounded-md"
>
 
</a>

          <a href="https://youtube.com/@rupdarshan?si=jsK3KOB1GHBrDot4" className="link hover:scale-105 transition md:text-lg text-sm flex md:gap-1
             bg-[url('https://res.cloudinary.com/daai6xwtd/image/upload/v1770885266/youtube_oayjqv.avif')] bg-cover bg-center bg-no-repeat
             px-4 py-4 rounded-md"
>
        <p className="links text-[13px] md:text-lg">
          </p></a>

      </div>
      <h4 ref={text1Ref}  className=' cursor-pointer landing-text1 md:text-6xl text-[9vw]  md:leading-20 leading-10  md:text-black text-white absolute z-[50] md:bottom-[15%] bottom-[70%] md:left-32 left-[10vw]  tracking-tight  max-w-none md:max-w-[650px] font-bold md:text-start text-center hidden'>
      {language === "en"
  ? "Exclusive Collections for Every Occasion"
  : "प्रत्येक प्रसंगासाठी खास संग्रह"}

      </h4>


      <div ref={text2Ref} className='cursor-pointer flex md:flex-col landing-text2 md:text-9xl md:leading-12 leading-14 text-[10vw] md:text-black text-white z-[50] absolute tracking-normal font-sans md:right-[3%] right-[-5%] text-center top-[75%] md:top-[30%] text-nowrap '>
      {language === "en" ? (
  <>
    <img src="https://res.cloudinary.com/dm1lsindg/image/upload/v1767778918/logo-black_sv2suh.png" className=' md:h-[25vw] h-[28vw] w-auto mt-[vw]' alt="" />
    <h3 className="md:pl- pl-[3vw] font-bold text-2xl absolute top-[105%] right-[16%]  text-black">Rental Hub</h3>
  </>
) : (
  <><h2 className='font-extralight'>रूपाची</h2>
  <h3 className='font-extralight'>नवी ओळख.</h3>
  
  </>
)}

      </div>

      <div ref={text3Ref} class="flex flex-col items-center text-black z-60 absolute md:right-[45%] right-[10%] md:bottom-[9%] bottom-[43%] cursor-pointer hidden">

  <div class="md:w-28 w-10 h-10 md:h-28 border-2 border-black rounded-full flex items-center justify-center md:text-lg text-[10px] font-semibold relative">
  {language === "en"
  ? "Scrolling"
  : " स्क्रोल करा"}
    
  </div>
 

  <div class="md:w-28 w-10 h-10 md:h-28 rounded-full flex items-center justify-center -mt-6  relative">
    <div class="w-full h-full border-2 border-black rounded-full flex items-center justify-center">
      <i class="ri-arrow-down-double-line text-2xl"></i>
    </div>
  </div>

</div>


      
    </div>
  )
}

export default LandingPage
